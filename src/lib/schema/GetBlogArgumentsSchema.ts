import { Infer, object, string } from 'superstruct'

export const GetBlogArgumentsSchema = object({
    sk: string()
})

export type GetBlogArgumentsSchemaType = Infer<typeof GetBlogArgumentsSchema>