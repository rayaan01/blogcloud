import { DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import { DBScanSchemaType } from '../schema/DBScanSchema'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbScan = async <T>({
    table,
    filterExpression,
    expressionAttributeNames,
    expressionAttributeValues
}: DBScanSchemaType): Promise<T[] | undefined> => {
    try {
        const params: ScanCommandInput = {
            TableName: table
        }

        if (filterExpression) {
            params.FilterExpression = filterExpression
        }

        if (expressionAttributeNames) {
            params.ExpressionAttributeNames = expressionAttributeNames
        }

        if (expressionAttributeValues) {
            params.ExpressionAttributeValues = marshall(expressionAttributeValues)
        }

        const command = new ScanCommand(params)
        const response = await client.send(command)

        if (response.Items) {
            const items = response.Items.map(item => unmarshall(item) as T)
            return items
        }

        return undefined
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}