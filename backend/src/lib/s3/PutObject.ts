import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import { s3Client } from './client'

interface PutObjectInterface {
    bucketName: string,
    key: string,
    body: PutObjectCommandInput['Body'],
    contentEncoding?: string,
    contentType?: string
}

export const PutObject = async ({
    bucketName,
    key,
    body,
    contentEncoding,
    contentType
}: PutObjectInterface): Promise<boolean> => {
    try {
        const params: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: key,
            Body: body
        }

        if (contentEncoding) {
            params.ContentEncoding = contentEncoding
        }

        if (contentType) {
            params.ContentType = contentType
        }
    
        const command = new PutObjectCommand(params)
        const response = await s3Client.send(command)
        return response.$metadata.httpStatusCode === 200
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}