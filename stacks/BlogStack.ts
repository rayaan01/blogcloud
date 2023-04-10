import { RemovalPolicy } from 'aws-cdk-lib'
import { StackContext, Api, Table } from 'sst/constructs'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { appSecrets } from '../src/utils/appSecrets'

export function BlogStack({ stack }: StackContext): void {

  stack.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    memorySize: 1024,
    timeout: 10,
  })

  stack.addDefaultFunctionEnv({
    BLOGS_TABLE_NAME: appSecrets.blogsTable,
    USERS_TABLE_NAME: appSecrets.usersTable,
    AWS_LOCAL_REGION: appSecrets.region,
    AWS_ACCOUNT_ID: appSecrets.account
  })

  const api = new Api(stack, 'api', {
    routes: {
      'POST /login': 'src/functions/login.handler',
      'GET /blogs': 'src/functions/getBlogs.handler',
      'POST /blogs': 'src/functions/putBlog.handler'
    },
    cdk: {
      httpApi: {
        apiName: `${stack.stage}-blogs-api`,
      },
    },
  })

  api.attachPermissionsToRoute('POST /login', [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:GetItem',
        'dynamodb:PutItem',
      ],
      resources: [
        `arn:aws:dynamodb:${appSecrets.region}:${appSecrets.account}:table/${appSecrets.usersTable}`,
      ],
    })
  ])

  api.attachPermissionsToRoute('GET /blogs', [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:GetItem',
      ],
      resources: [
        `arn:aws:dynamodb:${appSecrets.region}:${appSecrets.account}:table/${appSecrets.blogsTable}`,
      ],
    })
  ])

  const blogsTable = new Table(stack, 'blogs-table', {
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
        tableName: `${stack.stage}-blogs-table`,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    }
  })


  const usersTable = new Table(stack, 'users-table', {
    fields: {
      pk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
    },
    cdk: {
      table: {
        tableName: `${stack.stage}-users-table`,
        removalPolicy: RemovalPolicy.DESTROY,
      }
    }
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    BlogsTableName: blogsTable.tableName,
    UsersTableName: usersTable.tableName,
  })
}
