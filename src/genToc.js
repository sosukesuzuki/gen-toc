"use strict";

const { parse, stringifyFromAst } = require("./lib/remark");

function genToc(source) {
  if (typeof source !== "string") throw new Error("source is must be a string");

  const ast = parse(source);
  const text = stringifyFromAst(ast);

  return text;
}

module.exports = genToc;
