import { Infer, object, string } from 'superstruct'

export const loginArgumentsSchema = object({
    username: string(),
    password: string()
})

export type loginArgumentsSchemaType = Infer<typeof loginArgumentsSchema>