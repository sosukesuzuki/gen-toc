import { version } from "../../package.json";
import fs from "fs";
import program from "commander";
import chalk from "chalk";
import genToc from "../genToc";

function writeFile(path: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", error => {
      if (error) reject(error);
      resolve();
    });
  });
}

function readFile(path: string): Promise<string> {
  return new Promise((resove, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) reject(error);
      resove(data);
    });
  });
}

export async function run(): Promise<void> {
  program
    .version(version)
    .arguments("<filename>")
    .option("-w --write", "write to file")
    .option("-nf --noformat", "don't format with prettier")
    .parse(process.argv);

  if (program.args.length === 0) return;

  const filenames = program.args;

  const datas = await Promise.all(
    filenames.map(filename => readFile(filename))
  );

  const hasWriteOption = program.write;
  const hasNoFormatOption = program.noformat;

  await Promise.all(
    datas.map(async (data, i) => {
      const attached = genToc(data, { noFormat: hasNoFormatOption });

      if (hasWriteOption) {
        const filename = filenames[i];
        await writeFile(filename, attached);
        if (data === attached) {
          console.log(chalk.gray(filename));
        } else {
          console.log(filename);
        }
      } else {
        console.log(attached);
      }
    })
  );

  if (hasWriteOption) console.log("Done");
}
