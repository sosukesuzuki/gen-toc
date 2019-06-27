import { parse, stringifyFromAst } from "../../src/lib/remark";

describe("remark", () => {
  describe("parse", () => {
    it("returns mdast", () => {
      // Given
      const source = "# Foo";

      // When
      const res = parse(source);

      // Then
      expect(res).toMatchObject({
        type: "root",
        children: [
          {
            type: "heading",
            depth: 1
          }
        ]
      });
    });
  });

  describe("stringifyFromAst", () => {
    it("returns string", () => {
      // Given
      const source = "# Foo";
      const ast = parse(source);

      // When
      const res = stringifyFromAst(ast);

      // Then
      expect(res).toBe("# Foo\n");
    });
  });
});
