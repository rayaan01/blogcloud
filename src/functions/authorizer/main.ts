import middy from '@middy/core'
import { APIGatewayRequestAuthorizerEvent, APIGatewaySimpleAuthorizerWithContextResult, APIGatewaySimpleAuthorizerResult, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { appSecrets } from '../../utils/appSecrets'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'

type Response = APIGatewaySimpleAuthorizerWithContextResult<AuthContextSchemaType> | APIGatewaySimpleAuthorizerResult

export const authorizationHandler: Handler<APIGatewayRequestAuthorizerEvent, Response> = async (event) => {
    try {
        const token = event.headers?.authorization

        if (!token) {
            throw new Error('No token provided')
        }

        const user = jwt.verify(token, appSecrets.authSecret) as AuthContextSchemaType
        return {
            isAuthorized: true,
            context: user
        }
    }
    catch (err) {
        return {
            isAuthorized: false,
        }
    }
}

export const handler = middy(authorizationHandler)