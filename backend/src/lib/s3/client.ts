import { S3 } from '@aws-sdk/client-s3'
import { appSecrets } from '../../utils/appSecrets'

declare let process: {
    env: {
        GLOBAL_AWS_ACCESS_KEY_ID: string,
        GLOBAL_AWS_SECRET_ACCESS_KEY: string
    }
}

export const s3Client = new S3({
    region: appSecrets.region,
    credentials: {
        accessKeyId: process.env.GLOBAL_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.GLOBAL_AWS_SECRET_ACCESS_KEY
    }
})