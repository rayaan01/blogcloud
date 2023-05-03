import { MiddlewareObj, Request } from '@middy/core'
import createHttpError from 'http-errors'
import { Struct, assert } from 'superstruct'
import { httpResponses } from '../../utils/httpResponses'
import { APIGatewayProxyEventV2WithLambdaAuthorizer } from 'aws-lambda'
import { AuthContextSchemaType } from '../schema/utils/AuthContextSchema'

type Event = APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>

export const validateQueryParamsMiddleware = <TStruct1, TStruct2>({ schema }: { schema: Struct<TStruct1, TStruct2> }): MiddlewareObj<Event> => {

    const validateQueryParamsMiddlewareBase = (request: Request<Event>): void => {
        const params = request.event.queryStringParameters
        if (!params) {
            throw createHttpError(400, httpResponses[400])
        }

        try {
            assert(params, schema)
        } catch (err) {
            throw createHttpError(400, httpResponses[400])
        }
    }

    return {
        before: validateQueryParamsMiddlewareBase
    }
}
