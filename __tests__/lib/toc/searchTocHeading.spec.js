const searchTocHeading = require("../../../src/lib/toc/searchTocHeading");

describe("searchTocHeading", () => {
  it("returns heading node", () => {
    // Given
    const source = "# Foo\n## Table of Contents";

    // When
    const res = searchTocHeading(source);

    // Then
    expect(res).toMatchObject({
      type: "heading",
      depth: 2
    });
  });

  it("returns null when toc heading does not exist", () => {
    // Given
    const source = "# Foo";

    // When
    const res = searchTocHeading(source);

    // Then
    expect(res).toBeNull();
  });
});
