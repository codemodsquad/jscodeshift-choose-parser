var path = require('path')
var resolve = require('resolve')
var findRoot = require('find-root')
var invalidateRequireCache = require('invalidate-require-cache')

module.exports = function chooseJSCodeshiftParser(file) {
  var parentDir = path.dirname(file)
  var tsMatch = /\.(tsx?)$/.exec(file)
  if (tsMatch) {
    try {
      // if @babel/preset-typescript is found, try to parse with @babel/core instead of ts/x.
      resolve.sync('@babel/preset-typescript', { basedir: parentDir })
    } catch (error) {
      return tsMatch[1]
    }
  }
  try {
    invalidateRequireCache(path.join(findRoot(file), 'node_modules'))
    var babel = require(resolve.sync('@babel/core', { basedir: parentDir }))
    return {
      parse: function parse(code) {
        return babel.parseSync(code, {
          cwd: parentDir,
          filename: file,
          // without this, babel won't search upward for a config file
          rootMode: 'upward-optional',
          // without this, jscodeshift would try to use esprima to tokenize the file,
          // which may not work
          parserOpts: { tokens: true },
        })
      },
    }
  } catch (error) {
    return undefined
  }
}
