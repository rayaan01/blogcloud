import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
// import { sign } from 'jsonwebtoken'
import { dbGet } from '../lib/dbGet'

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2 | undefined> => {
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

    const user = await dbGet({
        pk: username,
        sk: password
    })

    if (!user) {
        return {
            body: 'New User',
            statusCode: 200,
        }
    }
}