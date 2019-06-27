import findTocHeadingNodes from "../../../src/lib/toc/findTocHeadingNodes";
import { parse } from "../../../src/lib/remark";

describe("findTocHeadingNodes", () => {
  it("returns nodes of headings", () => {
    // Given
    const source = "# one\n## two-1\n## two-2\n### three";
    const ast = parse(source);

    // When
    const res = findTocHeadingNodes(ast);

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
