import { Infer, object, record, string } from 'superstruct'

const DBUpdateSchema = object({
    table: string(),
    key: object({
        pk: string(),
        sk: string()
    }),
    updateExpression: string(),
    expressionAttributeNames: record(string(), string()),
    expressionAttributeValues: record(string(), string())
})

export type DBUpdateSchemaType = Infer<typeof DBUpdateSchema>