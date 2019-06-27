import { parse, stringifyFromAst } from "./lib/remark";
import findTocMarkerNode from "./lib/toc/findTocMarkerNode";
import findTocHeadingNodes from "./lib/toc/findTocHeadingNodes";
import convertToHeadingTree from "./lib/toc/convertToHeadingTree";
import convertToTocAst from "./lib/toc/convertToTocAst";
import insertTocAstToBaseAst from "./lib/toc/insertTocAstToBaseAst";

export default function genToc(source: string): string {
  const ast = parse(source);
  const markerNode = findTocMarkerNode(ast);

  if (markerNode === null) throw new Error("set marker node");

  const headingNodes = findTocHeadingNodes(ast, markerNode);
  const headingTree = convertToHeadingTree(headingNodes);
  const tocAst = convertToTocAst(headingTree);

  const convertedAst = insertTocAstToBaseAst(ast, tocAst, markerNode);

  const text = stringifyFromAst(convertedAst);
  return text;
}
