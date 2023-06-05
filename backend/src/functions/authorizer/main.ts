import middy from '@middy/core'
import { APIGatewayRequestAuthorizerEvent, APIGatewaySimpleAuthorizerWithContextResult, APIGatewaySimpleAuthorizerResult, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { appSecrets } from '../../utils/appSecrets'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { parse } from 'cookie'

type Response = APIGatewaySimpleAuthorizerWithContextResult<AuthContextSchemaType> | APIGatewaySimpleAuthorizerResult

export const authorizationHandler: Handler<APIGatewayRequestAuthorizerEvent, Response> = async (event) => {
    try {
        const cookie = event.headers?.cookie ?? ''
        const { token } = parse(cookie)

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
            isAuthorized: false
        }
    }
}

export const handler = middy(authorizationHandler)