import { S3 } from '@aws-sdk/client-s3'
import { appSecrets } from '../../utils/appSecrets'

export const s3Client = new S3({
    region: appSecrets.region
})