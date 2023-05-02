import { MiddlewareObj, Request } from '@middy/core'
import createHttpError from 'http-errors'
import { Struct, assert } from 'superstruct'
import { httpResponses } from '../../utils/httpResponses'
import { APIGatewayProxyEventV2WithLambdaAuthorizer } from 'aws-lambda'
import { AuthContextSchemaType } from '../schema/AuthContextSchema'

type Event = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, 'body'> & {
    body: Record<string, string>
}

export const validateArgumentsMiddleware = <TStruct1, TStruct2>({ schema }: { schema: Struct<TStruct1, TStruct2> }): MiddlewareObj<Event> => {

    const validateArgumentsMiddlewareBase = (request: Request<Event>): void => {
        const { body } = request.event
        if (!body) {
            throw createHttpError(400, httpResponses[400])
        }

        try {
            assert(body, schema)
        } catch (err) {
            throw createHttpError(400, httpResponses[400])
        }
    }

    return {
        before: validateArgumentsMiddlewareBase
    }
}
