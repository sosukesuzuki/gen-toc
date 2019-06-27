import { parse, stringifyFromAst } from "./lib/remark";

export default function genToc(source: string): string {
  const ast = parse(source);
  console.log(JSON.stringify(ast, null, 2));
  const text = stringifyFromAst(ast);
  return text;
}
