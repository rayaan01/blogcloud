import middy from '@middy/core'
import { APIGatewayRequestAuthorizerEvent, APIGatewaySimpleAuthorizerWithContextResult, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { appSecrets } from '../../utils/appSecrets'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'

type Response = APIGatewaySimpleAuthorizerWithContextResult<AuthContextSchemaType | null>

export const authorizationHandler: Handler<APIGatewayRequestAuthorizerEvent, Response> = async (event) => {
    try {
        const token = event.headers?.authorization

        if (!token) {
            throw new Error('No token provided')
        }

        const user = jwt.verify(token, appSecrets.authSecret) as AuthContextSchemaType
        console.log('About to return')
        return {
            isAuthorized: true,
            context: user
        }
    }
    catch (err) {
        console.log('The error is', err)
        return {
            isAuthorized: false,
            context: null
        }
    }
}

export const handler = middy(authorizationHandler)