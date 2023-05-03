import { Handler, APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda'
import middy from '@middy/core'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { PutBlogArgumentsSchema, PutBlogArgumentsSchemaType } from '../../lib/schema/arguments/PutBlogArgumentsSchema'
import jsonBodyParser from '@middy/http-json-body-parser'
import { v4 } from 'uuid'
import { dbPut } from '../../lib/dynamodb/dbPut'
import { appSecrets } from '../../utils/appSecrets'
import { httpResponses } from '../../utils/httpResponses'
import { validateArgumentsMiddleware } from '../../lib/middlewares/validateArgumentsMiddleware'
import httpErrorHandler from '@middy/http-error-handler'
import { checkValidError } from '../../utils/checkValidError'
import createHttpError from 'http-errors'
import { BlogDBSchemaType } from '../../lib/schema/entities/BlogDBSchema'

type Event<T> = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<T>, 'body'> & {
    body: PutBlogArgumentsSchemaType
}

const putBlogHandler: Handler<Event<AuthContextSchemaType>, APIGatewayProxyResultV2> = async (event) => {
    try {
        const user = event.requestContext.authorizer.lambda
        const { title, content } = event.body

        const uid = v4()
        const pk = `USER#${user.email}`
        const sk = `BLOG#${uid}`
        const date = new Date()

        const payload: BlogDBSchemaType = {
            pk,
            sk,
            title,
            content,
            uid,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString()
        }

        await dbPut({
            item: payload,
            table: appSecrets.mainTable
        })

        return {
            statusCode: 200,
            body: httpResponses[200]
        }
    } catch (err) {
        if (checkValidError(err)) {
            throw err
        } else {
            throw createHttpError(500, httpResponses[500], { expose: true })
        }
    }
}

export const handler = middy(putBlogHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({ schema: PutBlogArgumentsSchema }))
    .use(httpErrorHandler())