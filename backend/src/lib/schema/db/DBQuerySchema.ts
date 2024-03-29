import { Infer, number, object, optional, record, string } from 'superstruct'

export const DBQuerySchema = object({
    table: string(),
    keyConditionExpression: string(),
    expressionAttributeNames: record(string(), string()),
    expressionAttributeValues: record(string(), string()),
    filterExpression: optional(string()),
    projectionExpression: optional(string()),
    limit: optional(number())
})

export type DBQuerySchemaType = Infer<typeof DBQuerySchema>