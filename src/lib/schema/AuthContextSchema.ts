import { Infer, object, string } from 'superstruct'

export const AuthContextSchema = object({
    name: string(),
    email: string(),
    iss: string(),
    aud: string(),
    sub: string(),
    iat: string(),
    exp: string()
})

export type AuthContextSchemaType = Infer<typeof AuthContextSchema>