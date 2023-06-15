import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { DBGetSchemaType } from '../schema/db/DBGetSchema'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbGet = async<T>({
    key,
    table
}: DBGetSchemaType): Promise<T | undefined> => {
    try {
        const command = new GetItemCommand({
            TableName: table,
            Key: marshall(key)
        })
        const response = await client.send(command)
        if (response.Item) {
            return unmarshall(response.Item) as T
        }
    } catch (err) {
        throw createHttpError(500, httpResponses[500])
    }
}

