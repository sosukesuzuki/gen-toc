import findTocMarkerNode from "../../../src/lib/toc/findTocMarkerNode";
import { parse } from "../../../src/lib/remark";

describe("searchTocHeading", () => {
  it("returns heading node", () => {
    // Given
    const source = "# Foo\n## Table of Contents";
    const ast = parse(source);

    // When
    const res = findTocMarkerNode(ast);

    // Then
    expect(res).toMatchObject({
      type: "heading",
      depth: 2
    });
  });

  it("returns special comment node", () => {
    // Given
    const source = "# Foo\n\n<!-- Table of Contents -->\n";
    const ast = parse(source);

    // When
    const res = findTocMarkerNode(ast);

    // Then
    expect(res).toMatchObject({
      type: "html",
      value: "<!-- Table of Contents -->"
    });
  })

  it("returns null when toc heading does not exist", () => {
    // Given
    const source = "# Foo";
    const ast = parse(source);

    // When
    const res = findTocMarkerNode(ast);

    // Then
    expect(res).toBeNull();
  });
});
