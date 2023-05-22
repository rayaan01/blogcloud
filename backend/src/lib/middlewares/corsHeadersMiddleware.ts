import { MiddlewareObj, Request } from '@middy/core'
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

export const attachCorsHeadersMiddleware = (): MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => {

    const attachCorsHeadersMiddlewareBase = (request: Request<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>): void => {
        const headers = {
            'Access-Control-Allow-Origin': request.event.headers.origin ?? 'https://fake-host.com',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Expose-Headers': 'token'
        }

        if (request.response) {
            request.response.headers = {
                ...(request.response.headers),
                ...headers
            }
        }
    }

    return {
        after: attachCorsHeadersMiddlewareBase
    }
}
