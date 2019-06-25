"use strict";

const pkg = require("../../package.json");
const fs = require("fs");
const program = require("commander");
const genToc = require("../getToc");

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", error => {
      if (error) reject(error);
      resolve();
    });
  });
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
}

async function run() {
  program
    .version(pkg.version)
    .arguments("<filename>")
    .option("-w --write")
    .parse(process.argv);

  if (program.args.length === 0) return;

  const filenames = program.args;
  const datas = await Promise.all(
    filenames.map(filename => readFile(filename))
  );

  const hasWriteOption = program.write;

  await Promise.all(
    datas.map(async (data, i) => {
      const attached = genToc(data);

      if (hasWriteOption) {
        const filename = filenames[i];
        await writeFile(filename, attached);
        console.log(filename);
      } else {
        console.log(attached);
      }
    })
  );

  if (hasWriteOption) {
    console.log("Done");
  }
}

module.exports = run;
