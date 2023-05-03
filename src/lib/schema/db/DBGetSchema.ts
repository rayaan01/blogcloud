import { Infer, object, string } from 'superstruct'

export const DBGetSchema = object({
    table: string(),
    key: object({
        pk: string(),
        sk: string()
    })
})

export type DBGetSchemaType = Infer<typeof DBGetSchema>