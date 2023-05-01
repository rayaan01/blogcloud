import { Infer, intersection, object, record, string, unknown } from 'superstruct'

export const DBPutSchema = object({
    table: string(),
    item: intersection([
        object({
            pk: string(),
            sk: string()
        }),
        record(string(), unknown())
    ])
})

export type DBPutSchemaType = Infer<typeof DBPutSchema>