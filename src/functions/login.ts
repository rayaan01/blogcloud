import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { dbGet } from '../lib/dynamodb/dbGet'
import { appSecrets } from '../utils/appSecrets'
import middy from '@middy/core'
import { UserSchema } from '../types'
import { compare } from 'bcryptjs'
import createError from 'http-errors'
import jsonBodyParser from '@middy/http-json-body-parser'
import { validateArgumentsMiddleware } from '../lib/middlewares/validateArgumentsMiddleware'
import { loginArgumentsSchema } from '../lib/schema/LoginArgumentsSchema'
import { loginArgumentsSchemaType } from '../lib/schema/LoginArgumentsSchema'
import { httpResponses } from '../utils/httpResponses'
import { serialize } from 'cookie'
import httpErrorHandler from '@middy/http-error-handler'

interface Event extends Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<string>, 'body'> {
    body: loginArgumentsSchemaType
}

const loginHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    const { email, password } = event.body

    const pk = `USER#${email}`

    const user = await dbGet<UserSchema>({
        pk,
        table: appSecrets.usersTable
    })

    if (user) {
        const passwordVerified = await compare(password, user.password)
        if (!passwordVerified) {
            throw createError.Unauthorized(httpResponses[401])
        }
    } else {
        throw createError.Unauthorized(httpResponses[400])
    }

    const authToken = jwt.sign({
        name: user.password,
        email: user.email
    }, appSecrets.authSecret, {
        subject: user.uid,
        issuer: appSecrets.issuer,
        audience: appSecrets.audience
    })

    return {
        statusCode: 200,
        body: httpResponses[200],
        cookies: [serialize('token', authToken)]
    }
}

export const handler = middy(loginHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: loginArgumentsSchema
    }))
    .use(httpErrorHandler())