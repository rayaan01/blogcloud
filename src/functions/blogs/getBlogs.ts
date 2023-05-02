import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyResultV2, Handler } from 'aws-lambda'
import { AuthContextSchemaType } from '../../lib/schema/AuthContextSchema'


const getBlogsHandler = async (): Handler<APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContextSchemaType>, APIGatewayProxyResultV2> => {

}