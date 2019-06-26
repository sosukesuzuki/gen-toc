import { parse, stingifyFromAst } from "./lib/remark";

export default function genToc(source: string) {
  const ast = parse(source);
  const text = stingifyFromAst(ast);
  return text;
}
