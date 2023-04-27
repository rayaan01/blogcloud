import { Infer, object, string } from 'superstruct'

export const UserDBSchema = object({
    pk: string(),
    email: string(),
    firstName: string(),
    lastName: string(),
    name: string(),
    uid: string(),
    password: string(),
    createdAt: string(),
    updatedAt: string(),
})

export type UserDBSchemaType = Infer<typeof UserDBSchema>