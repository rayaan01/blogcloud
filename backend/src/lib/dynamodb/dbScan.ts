import { ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb'
import { DBScanSchemaType } from '../schema/db/DBScanSchema'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { client } from './client'

export const dbScan = async <T>({
    table,
    filterExpression,
    expressionAttributeNames,
    expressionAttributeValues,
    limit = 10
}: DBScanSchemaType): Promise<T[] | undefined> => {
    try {
        const params: ScanCommandInput = {
            TableName: table,
            Limit: limit,
            FilterExpression: filterExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: marshall(expressionAttributeValues)
        }

        const command = new ScanCommand(params)
        const response = await client.send(command)
        const items = response.Items?.map(item => unmarshall(item) as T)
        return items
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}