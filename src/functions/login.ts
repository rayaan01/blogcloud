import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { dbGet } from '../lib/dynamodb/dbGet'
import { appSecrets } from '../utils/appSecrets'
import middy from '@middy/core'
import { UserSchema } from '../types'
import { compare } from 'bcryptjs'
import createError from 'http-errors'
import jsonBodyParser from '@middy/http-json-body-parser'
import { validateArgumentsMiddleware } from '../lib/middlewares/validateArgumentsMiddleware'
import { loginArgumentsSchema, loginArgumentsSchemaType } from '../lib/schema/LoginArgumentsSchema'
import { httpResponses } from '../utils/httpResponses'
import { serialize } from 'cookie'
import httpErrorHandler from '@middy/http-error-handler'
import createHttpError from 'http-errors'
import { checkValidError } from '../utils/checkValidError'

interface Event extends Omit<APIGatewayProxyEventV2, 'body'> {
    body: loginArgumentsSchemaType
}

const loginHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const { email, password } = event.body
        const pk = `USER#${email}`

        const user = await dbGet<UserSchema>({
            pk,
            table: appSecrets.usersTable
        })

        if (user) {
            const passwordVerified = await compare(password, user.password)
            if (!passwordVerified) {
                throw createError(401, httpResponses[401])
            }
        } else {
            throw createError(401, httpResponses[401])
        }

        const authToken = jwt.sign({
            name: user.name,
            email: user.email
        }, appSecrets.authSecret, {
            subject: user.uid,
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
            throw createHttpError(500, httpResponses[500])
        }
    }
}

export const handler = middy(loginHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: loginArgumentsSchema
    }))
    .use(httpErrorHandler())