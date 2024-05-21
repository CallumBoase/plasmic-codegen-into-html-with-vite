import { HelloProps } from ".";
import { CodeComponentMeta } from "@plasmicapp/host";

export const helloWorldMeta: CodeComponentMeta<HelloProps> = {
  name: "HelloWorld",
  importPath: './src/components/codeComponents/HelloWorld',
  props: {
    whoToGreet: {
      type: "string",
      defaultValue: "World",
    },
    something: {
      type: 'string'
    }
  }
};