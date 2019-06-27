import insertTocAstToBaseAst from "../../../src/lib/toc/insertTocAstToBaseAst";
import convertToTocAst from "../../../src/lib/toc/convertToTocAst";
import convertToHeadingTree from "../../../src/lib/toc/convertToHeadingTree";
import findTocHeadingNodes from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";
import findTocMarkerNode from "../../../src/lib/toc/findTocMarkerNode";
import { Node } from "unist";

describe("insertTocAstToBaseAst", () => {
  it("returns ast has toc", () => {
    // Given
    const source = `# onek
## Table of Contents
## Content1
`;
    const ast = parse(source);
    const markerNode = findTocMarkerNode(ast);
    const headingNodes = findTocHeadingNodes(ast, markerNode as Node);
    const headingTree = convertToHeadingTree(headingNodes);
    const tocAst = convertToTocAst(headingTree);

    // When
    const res = insertTocAstToBaseAst(ast, tocAst, markerNode as Node);

    // Then
    expect(res).toMatchObject({
      type: "root",
      children: [
        {
          type: "heading"
        },
        {
          type: "heading"
        },
        {
          type: "list"
        },
        {
          type: "heading"
        }
      ]
    });
  });
});
