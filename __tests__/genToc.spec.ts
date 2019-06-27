import genToc from "../src/genToc";

describe("genToc", () => {
  it("returns a string", () => {
    // Given
    const source = "# Foo\n## Table of Contents\n## Foo";

    // When
    const res = genToc(source);

    // Then
    expect(typeof res).toBe("string");
  });
});
