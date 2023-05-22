import middy from '@middy/core'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { httpResponses } from '../../utils/httpResponses'

const corsHandler: Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2> = async (event) => {
    const origin = event.headers.origin

    if (!origin) {
        return {
            statusCode: 403,
            body: httpResponses[403]
        }
    }

    if (origin.endsWith('.vercel.app') || origin === 'http://localhost:3000') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'content-type',
                'Access-Control-Allow-Methods': 'GET, POST'
            }
        }
    }

    return {
        statusCode: 403,
        body: httpResponses[403]
    }
}

export const handler = middy(corsHandler)