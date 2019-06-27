import { parse, stringifyFromAst } from "./lib/remark";

export default function genToc(source: string): string {
  const ast = parse(source);
  const text = stringifyFromAst(ast);
  return text;
}
