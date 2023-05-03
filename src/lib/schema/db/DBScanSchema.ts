import { Infer, number, object, optional, record, string } from 'superstruct'

export const DBScanSchema = object({
    table: string(),
    filterExpression: string(),
    expressionAttributeNames: record(string(), string()),
    expressionAttributeValues: record(string(), string()),
    projectionExpression: optional(string()),
    limit: optional(number())
})

export type DBScanSchemaType = Infer<typeof DBScanSchema>