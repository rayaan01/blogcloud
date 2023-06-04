import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { UpdateUserSchema, UpdateUserSchemaType } from '../../lib/schema/arguments/UpdateUserSchema'
import { AuthContextSchemaType } from '../../lib/schema/utils/AuthContextSchema'
import { dbUpdate } from '../../lib/dynamodb/dbUpdate'
import { appSecrets } from '../../utils/appSecrets'
import { checkValidError } from '../../utils/checkValidError'
import createHttpError from 'http-errors'
import { httpResponses } from '../../utils/httpResponses'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import { validateArgumentsMiddleware } from '../../lib/middlewares/validateArgumentsMiddleware'

type Event = Omit<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, 'body'> & {
    body: UpdateUserSchemaType
}

export const updateHandler: Handler<Event, APIGatewayProxyResultV2> = async (event) => {
    try {
        const user = event.requestContext.authorizer.lambda
        const { firstName, lastName } = event.body

        await dbUpdate({
            table: appSecrets.mainTable,
            key: {
                pk: `USER#${user.email}`,
                sk: `USER#${user.email}`
            },
            updateExpression: 'SET #firstName = :firstName, #lastName = :lastname',
            expressionAttributeNames: {
                '#firstName': 'firstName',
                '#lastName': 'lastName'
            },
            expressionAttributeValues: {
                firstName,
                lastName
            }
        })

        return {
            statusCode: 200,
            body: httpResponses[200]
        }
    } catch (err) {
        if (checkValidError(err)) {
            throw err
        }
        throw createHttpError(500, httpResponses[500], { expose: true })
    }
}

export const handler = middy(updateHandler)
    .use(jsonBodyParser())
    .use(validateArgumentsMiddleware({
        schema: UpdateUserSchema
    }))
    .use(httpErrorHandler())