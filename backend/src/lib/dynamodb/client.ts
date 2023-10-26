import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { appSecrets } from '../../utils/appSecrets'

export const client = new DynamoDBClient({
    region: appSecrets.region
})
