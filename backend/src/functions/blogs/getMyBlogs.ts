import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { appSecrets } from '../../utils/appSecrets'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import createHttpError from 'http-errors'
import httpErrorHandler from '@middy/http-error-handler'
import { dbQuery } from '../../lib/dynamodb/dbQuery'
import { BlogDBSchemaType } from '../../lib/schema/entities/BlogDBSchema'

const getMyBlogsHandler: Handler<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, APIGatewayProxyResultV2> = async (event) => {
    try {
        const pk = `USER#${event.requestContext.authorizer.lambda.email}`

        const items = await dbQuery<BlogDBSchemaType>({
            table: appSecrets.mainTable,
            keyConditionExpression: '#pk = :pk AND begins_with(#sk, :sk)',
            expressionAttributeNames: {
                '#pk': 'pk',
                '#sk': 'sk'
            },
            expressionAttributeValues: {
                ':pk': pk,
                ':sk': 'BLOG#'
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                message: 'ok',
                data: items ?? []
            })
        }
    } catch (err) {
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

export const handler = middy(getMyBlogsHandler).use(httpErrorHandler())