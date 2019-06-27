import unified from "unified";
import markdown from "remark-parse";
import stringify from "remark-stringify";
import { Node } from "unist";

export function parse(source: string): Node {
  const processor = unified().use(markdown);
  const ast = processor.runSync(processor.parse(source));
  return ast;
}

export function stringifyFromAst(ast: Node): string {
  const processor = unified().use(stringify);
  const text = processor.stringify(ast);
  return text;
}
