import convertToTocAst from "../../../src/lib/toc/convertToTocAst";
import convertToHeadingTree from "../../../src/lib/toc/convertToHeadingTree";
import findTocHeadingNodes from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";
import findTocMarkerNode from "../../../src/lib/toc/findTocMarkerNode";
import { Node } from "unist";

describe("convertToHeadingAst", () => {
  it("returns single order list ast", () => {
    // Given
    const source = `# onek
## Table of Contents
## Content1
## Content2
`;
    const ast = parse(source);
    const markerNode = findTocMarkerNode(ast);
    const headingNodes = findTocHeadingNodes(ast, markerNode as Node);
    const headingTree = convertToHeadingTree(headingNodes);

    // When
    const listAst = convertToTocAst(headingTree);

    // Then
    expect(listAst).toMatchObject({
      type: "list",
      children: [
        {
          type: "listitem",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  url: "#Content1",
                  children: [
                    {
                      type: "text",
                      value: "Content1"
                    }
                  ]
                }
              ]
            },
            undefined
          ]
        },
        {
          type: "listitem",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  url: "#Content2",
                  children: [
                    {
                      type: "text",
                      value: "Content2"
                    }
                  ]
                }
              ]
            },
            undefined
          ]
        }
      ]
    });
  });
});
