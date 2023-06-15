import { Infer, object, string } from 'superstruct'

export const GetBlogArgumentsSchema = object({
    id: string()
})

export type GetBlogArgumentsSchemaType = Infer<typeof GetBlogArgumentsSchema>