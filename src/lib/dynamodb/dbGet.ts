import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { DBGetSchemaType } from '../schema/DBGetSchema'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbGet = async<T>({
    pk,
    sk,
    table
}: DBGetSchemaType): Promise<T | undefined> => {

    try {
        const command = new GetItemCommand({
            TableName: table,
            Key: marshall({
                pk,
                sk
            })
        })

        const response = await client.send(command)

        if (response.Item) {
            return unmarshall(response.Item) as T
        }

    } catch (err) {
        throw createHttpError(500, httpResponses[500])
    }
}

