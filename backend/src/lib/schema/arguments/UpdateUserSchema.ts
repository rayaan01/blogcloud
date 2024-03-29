import { Infer, object, string } from 'superstruct'

export const UpdateUserSchema = object({
    firstName: string(),
    lastName: string(),
    profileImage: string()
})

export type UpdateUserSchemaType = Infer<typeof UpdateUserSchema>