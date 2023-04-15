import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
// import jwt from 'jsonwebtoken'
import { dbGet } from '../lib/dynamodb/dbGet'
import { appSecrets } from '../utils/appSecrets'
import middy from '@middy/core'
import { UserSchema } from '../types'
import { genSalt, hash } from 'bcryptjs'
import { dbPut } from '../lib/dynamodb/dbPut'
import jsonBodyParser from '@middy/http-json-body-parser'
import { validateArgumentsMiddleware } from '../lib/middlewares/validateArgumentsMiddleware'
import { loginArgumentsSchema } from '../lib/schema/LoginArgumentsSchema'
import { loginArgumentsSchemaType } from '../lib/schema/LoginArgumentsSchema'

interface Event extends Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<string>, 'body'> {
    body: loginArgumentsSchemaType
}

export const loginHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    const { username, password } = event.body

    const user = await dbGet<UserSchema>({
        pk: username,
        table: appSecrets.usersTable
    })

    if (!user) {
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const payload = {
            pk: username,
            email: username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        await dbPut({
            table: appSecrets.usersTable,
            item: payload
        })
    }

    return {
        statusCode: 200
    }
}

export const handler = middy(loginHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: loginArgumentsSchema
    }))