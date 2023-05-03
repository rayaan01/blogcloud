import { object, string } from 'superstruct'

export const ErrorObjectSchema = object({
    status: string(),
    message: string()
})