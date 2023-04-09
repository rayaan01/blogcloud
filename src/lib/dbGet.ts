import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { PkSkSchema, UserSchema } from '../types'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { appSecrets } from '../utils/appSecrets'

const client = new DynamoDBClient({
    region: appSecrets.region
})

export const dbGet = async ({
    pk,
    sk
}: PkSkSchema): Promise<UserSchema | null> => {
    const command = new GetItemCommand({
        TableName: appSecrets.usersTable,
        Key: marshall({
            pk,
            sk
        })
    })

    const response = await client.send(command)

    if (response.Item) {
        return unmarshall(response.Item) as UserSchema
    }

    return null
}

