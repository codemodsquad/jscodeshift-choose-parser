const { spawnSync } = require('child_process')
const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const { expect } = require('chai')
const pickJSCodeshiftParser = require('..')
const { describe, it } = require('mocha')

describe('pickJSCodeshiftParser', function() {
  this.timeout(10000)
  it('.ts file without babel', function() {
    expect(pickJSCodeshiftParser('test.ts')).to.equal('ts')
  })
  it('.tsx file without babel', function() {
    expect(pickJSCodeshiftParser('test.tsx')).to.equal('tsx')
  })
  it('.ts/x files with babel', async function() {
    const cwd = path.join(os.tmpdir(), 'pickJSCodeshiftParser', 'tsWithBabel')
    await fs.mkdirs(cwd)
    await fs.writeJson(path.join(cwd, 'package.json'), {
      name: 'tsWithBabel',
      devDependencies: {
        '@babel/core': '^7.0.0',
        '@babel/preset-typescript': '^7.0.0',
      },
    })
    spawnSync('yarn', { cwd })
    expect(pickJSCodeshiftParser(path.join(cwd, 'test.ts'))).to.equal('ts')
    expect(pickJSCodeshiftParser(path.join(cwd, 'test.tsx'))).to.equal('tsx')
  })
  it('.js files with babel', async function() {
    const cwd = path.join(os.tmpdir(), 'pickJSCodeshiftParser', 'jsWithBabel')
    await fs.mkdirs(cwd)
    await fs.writeJson(path.join(cwd, 'package.json'), {
      name: 'jsWithBabel',
      devDependencies: {
        '@babel/core': '^7.0.0',
      },
    })
    spawnSync('yarn', { cwd })
    expect(pickJSCodeshiftParser(path.join(cwd, 'test.js')))
      .to.have.property('parse')
      .that.be.an.instanceOf(Function)
  })
  it('.js files without babel', async function() {
    expect(pickJSCodeshiftParser('test.js')).to.be.undefined
  })
})
