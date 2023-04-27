import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import middy from '@middy/core'
import { genSalt, hash } from 'bcryptjs'
import { v4 } from 'uuid'
import jsonBodyParser from '@middy/http-json-body-parser'
import { serialize } from 'cookie'
import httpErrorHandler from '@middy/http-error-handler'
import createHttpError from 'http-errors'
import { signUpArgumentsSchema, signUpArgumentsSchemaType } from '../../lib/schema/SignUpArgumentsSchema'
import { appSecrets } from '../../utils/appSecrets'
import { httpResponses } from '../../utils/httpResponses'
import { checkValidError } from '../../utils/checkValidError'
import { validateArgumentsMiddleware } from '../../lib/middlewares/validateArgumentsMiddleware'
import { dbPut } from '../../lib/dynamodb/dbPut'

type Event = Omit<APIGatewayProxyEventV2, 'body'> & {
    body: signUpArgumentsSchemaType
}

const signupHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const { firstName, lastName, email, password } = event.body

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        const date = new Date()

        const uid = v4()
        const name = `${firstName} ${lastName}`
        const pk = `USER#${email}`

        const payload = {
            pk,
            email,
            firstName,
            lastName,
            name,
            uid,
            password: hashedPassword,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
        }

        await dbPut({
            table: appSecrets.usersTable,
            item: payload
        })

        const authToken = jwt.sign({
            name,
            email,
        }, appSecrets.authSecret, {
            subject: uid,
            issuer: appSecrets.issuer,
            audience: appSecrets.audience,
            expiresIn: '7d'
        })

        return {
            statusCode: 200,
            body: httpResponses[200],
            cookies: [serialize('token', authToken)]
        }
    } catch (err) {
        if (checkValidError(err)) {
            throw err
        } else {
            throw createHttpError(500, httpResponses[500], { expose: true })
        }
    }
}

export const handler = middy(signupHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: signUpArgumentsSchema
    }))
    .use(httpErrorHandler())