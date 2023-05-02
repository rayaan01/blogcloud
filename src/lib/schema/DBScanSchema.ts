import { Infer, object, optional, record, string } from 'superstruct'

export const DBScanSchema = object({
    table: string(),
    filterExpression: optional(string()),
    expressionAttributeNames: optional(record(string(), string())),
    expressionAttributeValues: optional(record(string(), string()))
})

export type DBScanSchemaType = Infer<typeof DBScanSchema>