import { findHeadingNodes, findHeadingNodesUnderMarker } from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";
import { Node } from "unist";
import findTocMarkerNode from "../../../src/lib/toc/findTocMarkerNode";

describe("findHeadingNodesUnderMarker", () => {
  it("returns nodes of heading under marker", () => {
    // Given
    const source = `# one

## Table of Contents

## Content1

## Content2

### Content3
`
    const ast = parse(source);
    const headingNodes = findHeadingNodes(ast.children as Node[]);
    const markerNode = findTocMarkerNode(ast);

    // When
    const res = findHeadingNodesUnderMarker(headingNodes, markerNode as Node);

    // Then
    expect(res).toMatchObject([{
      value: "Content1",
      depth: 2,
      line: 5
    }, {
      value: "Content2",
      depth: 2,
      line: 7
    }, {
      value: "Content3",
      depth: 3,
      line: 9
    }]);
  });
});

describe("findHeadingNodes", () => {
  it("returns nodes of headings", () => {
    // Given
    const source = "# one\n## two-1\n## two-2\n### three";
    const ast = parse(source);
    const { children } = ast;

    // When
    const res = findHeadingNodes(children as Node[]);

    // Then
    expect(res).toMatchObject([{
      value: "one",
      depth: 1,
      line: 1
    }, {
      value: "two-1",
      depth: 2,
      line: 2
    }, {
      value: "two-2",
      depth: 2,
      line: 3
    }, {
      value: "three",
      depth: 3,
      line: 4
    }])
  });
});
