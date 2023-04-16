import { Infer, object, string } from 'superstruct'

export const loginArgumentsSchema = object({
    name: string(),
    email: string(),
    password: string()
})

export type loginArgumentsSchemaType = Infer<typeof loginArgumentsSchema>