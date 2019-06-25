const genToc = require("../src/getToc");

describe("genToc", () => {
  it("returns a string", () => {
    // Given
    const source = "# Foo";

    // When
    const res = genToc(source);

    // Then
    expect(typeof res).toBe("string");
  });
});
