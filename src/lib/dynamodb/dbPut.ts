import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DBPutSchema } from '../../types'
import { marshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbPut = async<T>({
    item,
    table
}: DBPutSchema<T>): Promise<void> => {
    try {
        const command = new PutItemCommand({
            TableName: table,
            Item: marshall(item),
            ConditionExpression: 'attribute_not_exists(#pk) AND attribute_not_exists(#sk)',
            ExpressionAttributeNames: {
                '#pk': 'pk',
                '#sk': 'sk'
            }
        })

        await client.send(command)
    } catch (err) {
        if (err instanceof Error && err.message === 'The conditional request failed') {
            throw createHttpError(422, httpResponses[422])
        }

        throw createHttpError(500, httpResponses[500], { expose: true, statusCode: 500 })
    }
}

