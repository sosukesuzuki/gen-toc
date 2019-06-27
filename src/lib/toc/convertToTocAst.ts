import { HeadingTree } from "./convertToHeadingTree";
import { Node } from "unist";
import u from "unist-builder";

function buildListFromHeadingTree(nodes: HeadingTree[]): Node {
  const listNode = u("list", [
    ...nodes.map(node => {
      return node.children && node.children.length !== 0
        ? u("listitem", [
            u("paragraph", [
              u("link", { url: `#${node.value}` }, [
                u("text", { value: node.value })
              ])
            ]),
            buildListFromHeadingTree(node.children)
          ])
        : u("listitem", [
            u("paragraph", [
              u("link", { url: `#${node.value}` }, [
                u("text", { value: node.value })
              ])
            ])
          ]);
    })
  ]);

  return listNode;
}

export default function convertToTocAst(headingTree: HeadingTree[]): Node {
  const ast = buildListFromHeadingTree(headingTree);
  return ast;
}
