import { Handler, APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda'
import middy from '@middy/core'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'
import { PutBlogArgumentsSchemaType } from '../../lib/schema/PutBlogArgumentsSchema'
import jsonBodyParser from '@middy/http-json-body-parser'

type Event<T> = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<T>, 'body'> & {
    body: PutBlogArgumentsSchemaType
}

const putBlogHandler: Handler<Event<AuthContextSchemaType>, APIGatewayProxyResultV2> = (event) => {
    const user = event.requestContext.authorizer.lambda
    const { title, content } = event.body
}

export const handler = middy(putBlogHandler)
    .use(jsonBodyParser())