import { HeadingTree } from "./convertToHeadingTree";
import { Node } from "unist";
import u from "unist-builder";

function buildListFromHeadingTree(nodes: HeadingTree[]): Node {
  const listNode = u("list", [
    ...nodes.map(node =>
      u("listitem", [
        u("paragraph", [
          u("link", { url: `#${node.value}` }, [
            u("text", { value: node.value })
          ])
        ]),
        node.children &&
          node.children.length !== 0 ?
          buildListFromHeadingTree(node.children) :
          undefined
      ])
    )
  ]);

  return listNode;
}

export default function convertToHeadingAst(headingTree: HeadingTree[]): Node {
  const ast = buildListFromHeadingTree(headingTree);
  return ast;
}
