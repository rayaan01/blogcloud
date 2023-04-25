import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { DBGetSchema } from '../../types'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbGet = async<T>({
    pk,
    sk,
    table
}: DBGetSchema): Promise<T | undefined> => {

    try {
        const command = new GetItemCommand({
            TableName: table,
            Key: marshall({
                pk,
                ...(sk && { sk })
            })
        })

        const response = await client.send(command)

        if (response.Item) {
            return unmarshall(response.Item) as T
        }

    } catch (err) {
        throw createError(500, httpResponses[500])
    }
}

