function genToc(source) {
  if (typeof source !== "string") throw new Error("source is must be a string");

  return source;
}

module.exports = genToc;
