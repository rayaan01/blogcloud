import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { appSecrets } from '../../utils/appSecrets'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import createHttpError from 'http-errors'
import httpErrorHandler from '@middy/http-error-handler'
import { validateQueryParamsMiddleware } from '../../lib/middlewares/validateQueryParamsMiddleware'
import { dbGet } from '../../lib/dynamodb/dbGet'
import { GetBlogArgumentsSchema, GetBlogArgumentsSchemaType } from '../../lib/schema/arguments/GetBlogArgumentsSchema'
import { BlogDBSchemaType } from '../../lib/schema/entities/BlogDBSchema'
import { checkValidError } from '../../utils/checkValidError'

type Event = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, 'queryStringParameters'> & {
    queryStringParameters: GetBlogArgumentsSchemaType
}

const getBlogHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const pk = `USER#${event.requestContext.authorizer.lambda.email}`
        const { id } = event.queryStringParameters
        const sk = `BLOG#${id}`

        const item = await dbGet<BlogDBSchemaType>({
            table: appSecrets.mainTable,
            key: {
                pk,
                sk
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                message: 'ok',
                data: item ?? null
            })
        }
    }
    catch (err) {
        if (checkValidError(err)) {
            throw err
        }
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

export const handler = middy(getBlogHandler)
    .use(validateQueryParamsMiddleware({ schema: GetBlogArgumentsSchema }))
    .use(httpErrorHandler())