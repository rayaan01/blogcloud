import { SSTConfig } from "sst";
import { BlogStack } from "./stacks/BlogStack";

export default {
  config(_input) {
    return {
      name: "blogcloud",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(BlogStack, {
      id: 'blog-stack',
    })
  }
} satisfies SSTConfig;
