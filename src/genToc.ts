import { parse, stringifyFromAst } from "./lib/remark";
import prettier from "prettier";
import findTocMarkerNode from "./lib/toc/findTocMarkerNode";
import findTocHeadingNodes from "./lib/toc/findTocHeadingNodes";
import convertToHeadingTree from "./lib/toc/convertToHeadingTree";
import convertToTocAst from "./lib/toc/convertToTocAst";
import insertTocAstToBaseAst from "./lib/toc/insertTocAstToBaseAst";

type Options = {
  noFormat: boolean;
};

export default function genToc(
  source: string,
  options: Options = { noFormat: false }
): string {
  const ast = parse(source);
  const markerNode = findTocMarkerNode(ast);

  if (markerNode === null) throw new Error("set marker node");

  const headingNodes = findTocHeadingNodes(ast, markerNode);
  const headingTree = convertToHeadingTree(headingNodes);
  const tocAst = convertToTocAst(headingTree);

  const convertedAst = insertTocAstToBaseAst(ast, tocAst, markerNode);

  const text = stringifyFromAst(convertedAst);
  if (options.noFormat) return text;

  const formatted = prettier.format(text, { parser: "markdown" });

  return formatted;
}
