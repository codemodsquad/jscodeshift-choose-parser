# jscodeshift-choose-parser

[![CircleCI](https://circleci.com/gh/codemodsquad/jscodeshift-choose-parser.svg?style=svg)](https://circleci.com/gh/codemodsquad/jscodeshift-choose-parser)
[![Coverage Status](https://codecov.io/gh/codemodsquad/jscodeshift-choose-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/codemodsquad/jscodeshift-choose-parser)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/jscodeshift-choose-parser.svg)](https://badge.fury.io/js/jscodeshift-choose-parser)

### `chooseJSCodeshiftParser(file: string): string | Parser`

```js
const chooseJSCodeshiftParser = require('jscodeshift-choose-parser')
```

Intelligently chooses a parser for a given file. Basically:

- If extension is `.ts` or `.tsx`:
  - If `@babel/core` and `@babel/preset-typescript` are installed, return parser that uses `@babel/core` using local babel config
  - Else return `'ts'`/`'tsx'` depending on extension
- Else if `@babel/core` is installed, return parser that uses with `@babel/core` using local babel config
- Else return `undefined`

The default `babylon` parser in `jscodeshift` **does not use your local babel config** AFAIK. This package
returns a parser that **does use your local babel config**.
