
import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { appSecrets } from '../utils/appSecrets'
import middy from '@middy/core'
import { genSalt, hash } from 'bcryptjs'
import { v4 } from 'uuid'
import { dbPut } from '../lib/dynamodb/dbPut'
import jsonBodyParser from '@middy/http-json-body-parser'
import { validateArgumentsMiddleware } from '../lib/middlewares/validateArgumentsMiddleware'
import { loginArgumentsSchema } from '../lib/schema/LoginArgumentsSchema'
import { loginArgumentsSchemaType } from '../lib/schema/LoginArgumentsSchema'
import { httpResponses } from '../utils/httpResponses'
import { serialize } from 'cookie'

interface Event extends Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<string>, 'body'> {
    body: loginArgumentsSchemaType
}

const signupHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    const { firstName, lastName, email, password } = event.body

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    const date = new Date()

    const uid = v4()
    const name = `${firstName} ${lastName}`

    const payload = {
        pk: `USER#${email}`,
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
        audience: appSecrets.audience
    })

    return {
        statusCode: 200,
        body: httpResponses[200],
        cookies: [serialize('token', authToken)]
    }
}

export const handler = middy(signupHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: loginArgumentsSchema
    }))