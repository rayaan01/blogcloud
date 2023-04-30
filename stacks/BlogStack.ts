import { RemovalPolicy } from 'aws-cdk-lib'
import { StackContext, Api, Table, Function } from 'sst/constructs'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { appSecrets } from '../src/utils/appSecrets'

export function BlogStack({ stack }: StackContext): void {

  stack.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    memorySize: 1024,
    timeout: 10,
  })

  stack.addDefaultFunctionEnv({
    STAGE: appSecrets.stage,
    MAIN_TABLE_NAME: appSecrets.mainTable,
    AWS_LOCAL_REGION: appSecrets.region,
    AWS_ACCOUNT_ID: appSecrets.account,
    AUTH_ISSUER: appSecrets.issuer,
    AUTH_AUDIENCE: appSecrets.audience,
    AUTH_SECRET: appSecrets.authSecret
  })

  const authorizerFunction = new Function(stack, 'AuthorizerFunction', {
    handler: 'src/functions/authorizer/main.handler',
    functionName: `${appSecrets.stage}-Custom-Authorizer`,
  })

  const api = new Api(stack, 'api', {
    authorizers: {
      customAuthorizer: {
        type: 'lambda',
        function: authorizerFunction,
        responseTypes: ['simple'],
        identitySource: ['$request.header.Authorization'],
      }
    },
    routes: {
      'POST /login': 'src/functions/users/login.handler',
      'POST /signup': 'src/functions/users/signup.handler',
      'POST /blog': {
        authorizer: 'customAuthorizer',
        function: 'src/functions/blogs/putBlog.handler',
      },
    },
    cdk: {
      httpApi: {
        apiName: appSecrets.apiGatewayName,
      }
    },
  })

  api.attachPermissionsToRoute('POST /signup', [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:PutItem',
      ],
      resources: [
        `arn:aws:dynamodb:${appSecrets.region}:${appSecrets.account}:table/${appSecrets.mainTable}`,
      ],
    })
  ])

  api.attachPermissionsToRoute('POST /login', [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:GetItem',
      ],
      resources: [
        `arn:aws:dynamodb:${appSecrets.region}:${appSecrets.account}:table/${appSecrets.mainTable}`,
      ],
    })
  ])

  api.attachPermissionsToRoute('POST /blog', [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:PutItem',
      ],
      resources: [
        `arn:aws:dynamodb:${appSecrets.region}:${appSecrets.account}:table/${appSecrets.mainTable}`,
      ],
    })
  ])

  const mainTable = new Table(stack, 'main-table', {
    fields: {
      pk: 'string',
      sk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk'
    },
    cdk: {
      table: {
        tableName: appSecrets.mainTable,
        removalPolicy: appSecrets.stage !== 'production' ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
      }
    }
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    TableName: mainTable.tableName,
  })
}
