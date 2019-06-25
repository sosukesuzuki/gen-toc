const { parse } = require("../remark");

function isTocNode(node) {
  const tocTexts = ["Table of Contents"];

  switch (node.type) {
    case "heading":
      return tocTexts.includes(node.children[0].value);
    default:
      return false;
  }
}

function searchFromAst(ast) {
  return ast.children.find(node => isTocNode(node));
}

function searchTocHeading(source) {
  const ast = parse(source);
  return searchFromAst(ast) || null;
}

module.exports = searchTocHeading;
