import { Infer, object, string } from 'superstruct'

export const loginArgumentsSchema = object({
    email: string(),
    password: string()
})

export type loginArgumentsSchemaType = Infer<typeof loginArgumentsSchema>