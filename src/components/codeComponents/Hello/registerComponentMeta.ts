import { HelloProps } from ".";
import { CodeComponentMeta } from "@plasmicapp/host";

export const helloMeta: CodeComponentMeta<HelloProps> = {
  name: "Hello",
  importPath: './src/components/codeComponents/Hello',
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