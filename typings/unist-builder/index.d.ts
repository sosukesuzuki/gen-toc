declare module "unist-builder" {
  import { Node } from "unist";

  export default function(
    type: string,
    childrenOrOptions?: Node[] | any,
    children?: Node[]
  ): Node;
}
