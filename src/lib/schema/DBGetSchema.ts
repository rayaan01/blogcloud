import { Infer, object, string } from 'superstruct'

export const DBGetSchema = object({
    pk: string(),
    sk: string(),
    table: string()
})

export type DBGetSchemaType = Infer<typeof DBGetSchema>