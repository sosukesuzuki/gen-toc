import { parse } from "../remark";
import { Node } from "unist";

function isTocNode(node: Node): boolean {
  const tocTexts = ["Table of Contents"];

  switch (node.type) {
    case "heading": {
      if (Array.isArray(node.children)) {
        return tocTexts.includes(node.children[0].value);
      }
    }
  }

  return false;
}

function findTocNodeFromAst(ast: Node) {
  return (ast.children as Node[]).find((node: Node) => isTocNode(node));
}

export default function findTocNode(source: string): Node | null {
  const ast = parse(source);
  const res = findTocNodeFromAst(ast);
  return res || null;
}
