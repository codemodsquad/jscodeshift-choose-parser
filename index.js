var path = require('path')
var resolve = require('resolve')
var invalidateRequireCache = require('invalidate-require-cache')

module.exports = function chooseJSCodeshiftParser(file) {
  var parentDir = path.dirname(file)
  var tsMatch = /\.(tsx?)$/.exec(file)
  if (tsMatch) return tsMatch[1]
  try {
    invalidateRequireCache(
      path.resolve(
        resolve.sync('@babel/core/package.json', { basedir: parentDir }),
        '..',
        '..'
      )
    )
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
