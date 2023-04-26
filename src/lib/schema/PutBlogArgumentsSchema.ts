import { object, string, size, Infer } from 'superstruct'

export const PutBlogArgumentsSchema = object({
    title: size(string(), 3, 20),
    content: size(string(), 1, 1000)
})

export type PutBlogArgumentsSchemaType = Infer<typeof PutBlogArgumentsSchema>