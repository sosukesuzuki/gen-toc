import { parse } from "../remark";
import { Node } from "unist";

function getMarkdownCommentValue(text: string): string | null {
  const matched = text.match(/<!--\s*(.*?)\s*-->/);
  if (matched === null) {
    return null;
  } else {
    return matched[1];
  }
}

function isSpecialTocWord(text: string) {
  const specialTocWords = ["Table of Contents"];
  return specialTocWords.includes(text);
}

function isTocNode(node: Node): boolean {
  switch (node.type) {
    case "heading": {
      const { children } = node;
      if (!Array.isArray(children)) break;

      const { value } = children[0];
      if (typeof value !== "string") break;

      if (isSpecialTocWord(value)) {
        return true;
      }

      break;
    }
    case "html": {
      if (typeof node.value !== "string") break;

      const commentValue = getMarkdownCommentValue(node.value);

      if (commentValue === null || isSpecialTocWord(node.value)) break;

      return true;
    }
  }

  return false;
}

function findTocNodeFromAst(ast: Node): Node | null {
  const res =  (ast.children as Node[]).find((node: Node) => isTocNode(node));

  if (res === undefined) {
    return null;
  } else {
    return res;
  }
}

export default function findTocMarkerNode(source: string): Node | null {
  const ast = parse(source);
  const res = findTocNodeFromAst(ast);
  return res;
}
