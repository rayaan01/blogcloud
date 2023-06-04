import { Infer, number, object, string } from 'superstruct'

export const AuthContextSchema = object({
    firstName: string(),
    lastName: string(),
    email: string(),
    iss: string(),
    aud: string(),
    sub: string(),
    iat: number(),
    exp: number()
})

export type AuthContextSchemaType = Infer<typeof AuthContextSchema>