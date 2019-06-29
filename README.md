# gen-toc

[![CircleCI](https://circleci.com/gh/sosukesuzuki/gen-toc.svg?style=svg)](https://circleci.com/gh/sosukesuzuki/gen-toc)
[![npm version](https://badge.fury.io/js/gen-toc.svg)](https://badge.fury.io/js/gen-toc)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A Markdown "Table of Contents" generator on CLI.

## Installation

```sh
$ npm install gen-toc
```

## Usage

Prepare a markdown file named `test.md` like below:

```sh
$ cat test.md
# Heading1

## Table of Contents

## Heading2-1

## Heading2-2
```

You can use `gen-toc` to generate "Table of Contents" into `test.md`.

```sh
$ gen-toc ./test.md
# Heading1

## Table of Contents

- [Heading2-1](#Heading2-1)
- [Heading2-2](#Heading2-2)

## Heading2-1

## Heading2-2
```

If you use `gen-toc` with `--write` option, `gen-toc` writes to a file.

```sh
$ gen-toc --write ./test.md
test.md
Done
```

`gen-toc` format a markdown with [Prettier](https://github.com/prettier/prettier) on default. If you don't want `gen-toc` to format, you can add `--noformat` option.

If you don't want to use a heading of `## Table of Contents`, you can use a comment of `<-- Table of Contents -->` instead of a heading.

```sh
$ cat test.md
# Heading1

<!-- Table of Contents -->

## Heading2-1

## Heading2-2

$ gen-toc test.md
# Heading1

<!-- Table of Contents -->

- [Heading2-1](#Heading2-1)
- [Heading2-2](#Heading2-2)

## Heading2-1

## Heading2-2
```

## LICENSE

MIT
