import { SSTConfig } from 'sst'
import { BlogStack } from './stacks/BlogStack'
import { ConfigOptions } from 'sst/project'

export default {
  config(): Promise<ConfigOptions> | ConfigOptions {
    return {
      name: 'blogcloud',
      region: 'eu-west-2'
    }
  },
  stacks(app): void {
    app.stack(BlogStack, {
      id: 'blog-stack'
    })
  }
} satisfies SSTConfig
