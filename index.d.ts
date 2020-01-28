import { Parser } from 'jscodeshift'
declare function chooseJSCodeshiftParser(
  file: string
): string | Parser | undefined
export = chooseJSCodeshiftParser
