import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { DBUpdateSchemaType } from '../schema/db/DBUpdateSchema'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbUpdate = async ({
    table,
    key,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues
}: DBUpdateSchemaType): Promise<void> => {
    try {
        const command = new UpdateItemCommand({
            TableName: table,
            Key: marshall(key),
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: marshall(expressionAttributeValues)
        })

        await client.send(command)
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

