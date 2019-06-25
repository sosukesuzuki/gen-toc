"use strict";

const unified = require("unified");
const u = require("unist-builder");
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

function genToc(source) {
  if (typeof source !== "string") throw new Error("source is must be a string");

  const ast = parse(source);
  const text = stringifyFromAst(ast);

  return text;
}

module.exports = genToc;
