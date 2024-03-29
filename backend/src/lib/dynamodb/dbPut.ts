import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { DBPutSchemaType } from '../schema/db/DBPutSchema'
import { client } from './client'

export const dbPut = async ({
    item,
    table
}: DBPutSchemaType): Promise<void> => {
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

