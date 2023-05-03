import { assert } from 'superstruct'
import { ErrorObjectSchema } from '../lib/schema/utils/ErrorObjectSchema'

export const checkValidError = (err: unknown): boolean => {
    try {
        const errorObject = err instanceof Error && JSON.parse(err.message)
        assert(errorObject, ErrorObjectSchema)
        return true
    } catch (err) {
        return false
    }
}