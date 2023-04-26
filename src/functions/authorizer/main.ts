import middy from '@middy/core'
import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent, Handler } from 'aws-lambda'
import jwt from 'jsonwebtoken'
import { appSecrets } from '../../utils/appSecrets'

export const authorizationHandler: Handler<APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult> = async (event) => {
    const { authorizationToken, methodArn } = event
    let effect = 'Deny'
    let user = {}

    try {
        user = jwt.verify(authorizationToken, appSecrets.authSecret)
        effect = 'Allow'
    } catch (err) {
        effect = 'Deny'
    }

    return {
        principalId: 'LambdaAuthorizer',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: methodArn
                }
            ]
        },
        context: user
    }
}

export const handler = middy(authorizationHandler)