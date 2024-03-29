import { QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb'
import { DBQuerySchemaType } from '../schema/db/DBQuerySchema'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { client } from './client'

export const dbQuery = async <T>({
    table,
    keyConditionExpression,
    expressionAttributeNames,
    expressionAttributeValues,
    filterExpression,
    projectionExpression,
    limit = 10
}: DBQuerySchemaType): Promise<T[] | undefined> => {
    try {
        const params: QueryCommandInput = {
            TableName: table,
            Limit: limit,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: marshall(expressionAttributeValues)
        }

        if (filterExpression) {
            params.FilterExpression = filterExpression
        }

        if (projectionExpression) {
            params.ProjectionExpression = projectionExpression
        }

        const command = new QueryCommand(params)
        const response = await client.send(command)
        const items = response.Items?.map(item => unmarshall(item) as T)
        return items
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}