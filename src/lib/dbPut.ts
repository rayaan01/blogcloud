import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DBPutSchema } from '../types'
import { marshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../utils/appSecrets'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbPut = async ({
    item,
    table
}: DBPutSchema): Promise<boolean> => {

    const command = new PutItemCommand({
        TableName: table,
        Item: marshall(item),
        ConditionExpression: 'attribute_not_exists(pk) and attribute_not_exists(sk)'
    })

    const response = await client.send(command)

    if (response.$metadata.httpStatusCode === 200) {
        return true
    }

    return false
}

