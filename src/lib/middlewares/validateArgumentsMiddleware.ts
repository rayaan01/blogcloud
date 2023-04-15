import { MiddlewareObj, Request } from '@middy/core'
import { Struct, assert } from 'superstruct'

export const validateArgumentsMiddleware = <TStruct1, TStruct2>({ schema }: { schema: Struct<TStruct1, TStruct2> }): MiddlewareObj => {

    const validateArgumentsMiddlewareBase = (request: Request): void => {
        const { body } = request.event
        if (body) {
            throw new Error('Invalid arguments')
        }

        try {
            assert(body, schema)
        } catch (err) {
            throw new Error('Invalid arguments')
        }
    }

    return {
        before: validateArgumentsMiddlewareBase
    }
}
