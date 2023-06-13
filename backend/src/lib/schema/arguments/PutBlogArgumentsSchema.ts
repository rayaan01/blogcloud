import { object, string, size, Infer } from 'superstruct'

export const PutBlogArgumentsSchema = object({
    title: size(string(), 3, 60),
    content: size(string(), 12, 2000)
})

export type PutBlogArgumentsSchemaType = Infer<typeof PutBlogArgumentsSchema>