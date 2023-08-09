import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { UpdateUserSchema, UpdateUserSchemaType } from '../../lib/schema/arguments/UpdateUserSchema'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { dbUpdate } from '../../lib/dynamodb/dbUpdate'
import { appSecrets } from '../../utils/appSecrets'
import { checkValidError } from '../../utils/checkValidError'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import { validateArgumentsMiddleware } from '../../lib/middlewares/validateArgumentsMiddleware'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { getCookieMaxAge } from '../../utils/getCookieMaxAge'
import { PutObject } from '../../lib/s3/PutObject'

type Event = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, 'body'> & {
    body: UpdateUserSchemaType
}

export const updateProfileHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const user = event.requestContext.authorizer.lambda
        const { firstName, lastName, profileImage } = event.body
        const name = `${firstName} ${lastName}`

        if (profileImage.length) {
            const buffer = Buffer.from(profileImage.replace(/^data:image\/\w+;base64,/, ''), 'base64')
            const response = await PutObject({
                bucketName: appSecrets.pfpBucket,
                key: `USER#${user.email}.jpg`,
                body: buffer,
                contentEncoding: 'base64',
                contentType: 'image/jpeg'
            })
            if (!response) {
                console.log('The response is', response)
                throw createHttpError(500, httpResponses[500], { expose: true })
            }
        }

        await dbUpdate({
            table: appSecrets.mainTable,
            key: {
                pk: `USER#${user.email}`,
                sk: `USER#${user.email}`
            },
            updateExpression: 'SET #firstName = :firstName, #lastName = :lastName, #name = :name',
            expressionAttributeNames: {
                '#firstName': 'firstName',
                '#lastName': 'lastName',
                '#name': 'name'
            },
            expressionAttributeValues: {
                ':firstName': firstName,
                ':lastName': lastName,
                ':name': name
            }
        })

        const authToken = jwt.sign({
            firstName,
            lastName,
            email: user.email
        }, appSecrets.authSecret, {
            subject: user.sub,
            issuer: appSecrets.issuer,
            audience: appSecrets.audience,
            expiresIn: '7d'
        })

        return {
            statusCode: 200,
            body: httpResponses[200],
            cookies: [serialize('token', authToken, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                maxAge: getCookieMaxAge()
            })],
            headers: {
                'token': authToken
            }
        }
    } catch (err) {
        if (checkValidError(err)) {
            throw err
        }
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

export const handler = middy(updateProfileHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: UpdateUserSchema
    }))
    .use(httpErrorHandler())