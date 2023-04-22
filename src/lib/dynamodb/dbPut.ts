import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DBPutSchema } from '../../types'
import { marshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../../utils/appSecrets'
import createError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbPut = async ({
    item,
    table
}: DBPutSchema): Promise<void> => {

    try {
        const command = new PutItemCommand({
            TableName: table,
            Item: marshall(item),
            ConditionExpression: 'attribute_not_exists(pk) and attribute_not_exists(sk)'
        })

        const response = await client.send(command)

        if (response.$metadata.httpStatusCode !== 200) {
            throw createError.InternalServerError(httpResponses[500])
        }
    } catch (err) {
        if (err instanceof Error && err.message === 'The conditional request failed') {
            throw createError.BadRequest(httpResponses[400])
        }
        throw createError.InternalServerError(httpResponses[500])
    }

}

