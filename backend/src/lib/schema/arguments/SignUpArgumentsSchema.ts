import { Infer, object, string } from 'superstruct'

export const signUpArgumentsSchema = object({
    firstName: string(),
    lastName: string(),
    email: string(),
    password: string()
})

export type signUpArgumentsSchemaType = Infer<typeof signUpArgumentsSchema>