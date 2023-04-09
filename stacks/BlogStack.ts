import { RemovalPolicy } from "aws-cdk-lib";
import { StackContext, Api, Table } from "sst/constructs";

export function BlogStack({ stack }: StackContext) {

  stack.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    memorySize: 1024,
    timeout: 10,
  })

  const api = new Api(stack, "api", {
    routes: {
      "GET /blogs": 'packages/functions/src/getBlogs.handler',
      "POST /blogs": 'packages/functions/src/putBlog.handler'
    },
    cdk: {
      httpApi: {
        apiName: `${stack.stage}-blogs-api`,
      },
    }
  });

  const table = new Table(stack, "table", {
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

  stack.addOutputs({
    ApiEndpoint: api.url,
    TableName: table.tableName,
  });
}
