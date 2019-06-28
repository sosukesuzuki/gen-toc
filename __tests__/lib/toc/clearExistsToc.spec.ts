import clearExistsToc from "../../../src/lib/toc/clearExistsToc";
import findTocMarkerNode from "../../../src/lib/toc/findTocMarkerNode";
import { parse } from "../../../src/lib/remark";
import { Node } from "unist";

describe("clearExistsToc", () => {
  it("returns ast removed toc", () => {
    // Given
    const source = `# Foo
## Table of Contents
- [foo](#foo)
- [bar](#bar)
`;
    const ast = parse(source);
    const markerNode = findTocMarkerNode(ast) as Node;

    // When
    const res = clearExistsToc(ast, markerNode);

    console.log(res)

    // Then
    expect(res).toMatchObject({
      type: "root",
      children: [{
        type: "heading",
        depth: 1
      }, {
        type: "heading",
        depth: 2
      }]
    });
  });
});
