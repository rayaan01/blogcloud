import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
// import jwt from 'jsonwebtoken'
import { dbGet } from '../lib/dbGet'
import { appSecrets } from '../utils/appSecrets'
import middy from '@middy/core'
import { UserSchema } from '../types'
import { genSalt, hash } from 'bcryptjs'
import { dbPut } from '../lib/dbPut'

export const loginHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2 | undefined> => {
    const { body } = event
    if (!body) {
        return {
            body: 'Please provide a username and a password'
        }
    }

    const { username, password } = JSON.parse(body)

    if (!username) {
        return {
            body: 'Please provide a username',
            statusCode: 400
        }
    }

    if (!password) {
        return {
            body: 'Please provide a password',
            statusCode: 400
        }
    }

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
}

export const handler = middy(loginHandler)