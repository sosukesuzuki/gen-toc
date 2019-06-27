import convertToHeadingAst from "../../../src/lib/toc/convertToHeadingAst";
import convertToHeadingTree from "../../../src/lib/toc/convertToHeadingTree";
import findTocHeadingNodes from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";

describe("convertToHeadingAst", () => {
  it("returns single order list ast", () => {
    // Given
    const source = `# onek
## Table of Contents
## Content1
## Content2
`;
    const ast = parse(source);
    const headingNodes = findTocHeadingNodes(ast);
    const headingTree = convertToHeadingTree(headingNodes);

    // When
    const listAst = convertToHeadingAst(headingTree);

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
