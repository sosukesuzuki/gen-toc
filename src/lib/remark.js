"use strict";

const unified = require("unified");
const markdown = require("remark-parse");
const stringify = require("remark-stringify");

function parse(source) {
  const processor = unified().use(markdown);
  const ast = processor.runSync(processor.parse(source));
  return ast;
}

function stringifyFromAst(ast) {
  const processor = unified().use(stringify);
  const text = processor.stringify(ast);
  return text;
}

module.exports = {
  parse,
  stringifyFromAst
};
