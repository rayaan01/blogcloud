import { Infer, object, string } from 'superstruct'

export const BlogDBSchema = object({
    pk: string(),
    sk: string(),
    title: string(),
    content: string(),
    uid: string(),
    createdAt: string(),
    updatedAt: string(),
})

export type BlogDBSchemaType = Infer<typeof BlogDBSchema>