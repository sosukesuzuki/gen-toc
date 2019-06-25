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

  it("throws a error when source is not string", () => {
    // Given
    const source01 = 3;
    const source02 = undefined;

    // Then
    expect(() => {
      // When
      genToc(source01);
    }).toThrow();

    // Then
    expect(() => {
      // When
      genToc(source02);
    }).toThrow();
  });
});
