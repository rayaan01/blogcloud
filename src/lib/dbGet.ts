import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { PkSkSchema, UserSchema } from '../types'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../utils/appSecrets'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbGet = async ({
    pk,
    sk,
    table
}: PkSkSchema): Promise<UserSchema | null> => {

    const command = new GetItemCommand({
        TableName: table,
        Key: marshall({
            pk,
            ...(sk && { sk })
        })
    })

    const response = await client.send(command)

    if (response.Item) {
        return unmarshall(response.Item) as UserSchema
    }

    return null
}

