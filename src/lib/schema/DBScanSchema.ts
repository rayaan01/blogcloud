import { Infer, object, optional, record, string } from 'superstruct'

export const DBScanSchema = object({
    table: string(),
    filterExpression: string(),
    expressionAttributeNames: record(string(), string()),
    expressionAttributeValues: record(string(), string()),
    projectionExpression: optional(string())
})

export type DBScanSchemaType = Infer<typeof DBScanSchema>