import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'
import { appSecrets } from '../../utils/appSecrets'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import createHttpError from 'http-errors'
import httpErrorHandler from '@middy/http-error-handler'
import { validateQueryParamsMiddleware } from '../../lib/middlewares/validateQueryParamsMiddleware'
import { dbGet } from '../../lib/dynamodb/dbGet'
import { GetBlogArgumentsSchema, GetBlogArgumentsSchemaType } from '../../lib/schema/GetBlogArgumentsSchema'
import { BlogDBSchemaType } from '../../lib/schema/BlogDBSchema'
import { checkValidError } from '../../utils/checkValidError'

type Event = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, 'queryStringParameters'> & {
    queryStringParameters: GetBlogArgumentsSchemaType
}

const getBlogHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const pk = `USER#${event.requestContext.authorizer.lambda.email}`
        const { sk } = event.queryStringParameters

        const item = await dbGet<BlogDBSchemaType>({
            table: appSecrets.mainTable,
            key: {
                pk,
                sk
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify(item)
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