import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'
import { dbScan } from '../../lib/dynamodb/dbScan'
import { appSecrets } from '../../utils/appSecrets'
import { BlogDBSchemaType } from '../../lib/schema/BlogDBSchema'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import createHttpError from 'http-errors'
import httpErrorHandler from '@middy/http-error-handler'

const getAllBlogsHandler: Handler<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, APIGatewayProxyResultV2> = async () => {
    try {
        const items = await dbScan<BlogDBSchemaType>({
            table: appSecrets.mainTable,
            filterExpression: 'begins_with(#pk, :pk) AND begins_with(#sk, :sk)',
            expressionAttributeNames: {
                '#pk': 'pk',
                '#sk': 'sk'
            },
            expressionAttributeValues: {
                ':pk': 'USER#',
                ':sk': 'BLOG#'
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify(items ?? [])
        }
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

export const handler = middy(getAllBlogsHandler).use(httpErrorHandler())