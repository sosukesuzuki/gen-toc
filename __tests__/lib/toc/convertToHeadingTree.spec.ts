import convertToHeadingTree from "../../../src/lib/toc/convertToHeadingTree";
import findTocHeadingNodes from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";

describe("convertToHeadingTree", () => {
  it("returns tree", () => {
    // Given
    const source = `# onek
## Table of Contents
## Content1
### SubContent1
### SubContent2
## Content2
### SubContent1
### SubContent2
### SubContent3
`;
    const ast = parse(source);
    const headingNodes = findTocHeadingNodes(ast);

    // When
    const res = convertToHeadingTree(headingNodes);

    // Then
    expect(res).toMatchObject([
      {
        value: "Content1",
        depth: 2,
        line: 3,
        children: [
          {
            value: "SubContent1",
            depth: 3,
            line: 4
          },
          {
            value: "SubContent2",
            depth: 3,
            line: 5
          }
        ]
      },
      {
        value: "Content2",
        depth: 2,
        line: 6,
        children: [
          {
            value: "SubContent1",
            depth: 3,
            line: 7
          },
          {
            value: "SubContent2",
            depth: 3,
            line: 8
          },
          {
            value: "SubContent3",
            depth: 3,
            line: 9
          }
        ]
      }
    ]);
  });

  it("returns single order tree", () => {
    // Given
    const source = `# onek
## Table of Contents
## Content1
## Content2
`;
    const ast = parse(source);
    const headingNodes = findTocHeadingNodes(ast);

    // When
    const res = convertToHeadingTree(headingNodes);

    // Then
    expect(res).toMatchObject([
      {
        value: "Content1",
        depth: 2,
        line: 3
      },
      {
        value: "Content2",
        depth: 2,
        line: 4
      }
    ]);
  });
});
