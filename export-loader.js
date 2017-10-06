const { generateExports } = require('./esprima')
const d                   = require('debug')('norequire')
const esprima             = require('esprima')
const escodegen           = require('escodegen')
const { readFileSync }    = require('fs')
const path                = require('path')
// main loader func, calls generateExports with dependencies
// which returns a func with a parser inside
function exportLoader(content) {
  try{
    let currentPath = this.resourcePath || path.resolve("./resourcePath.js")
    let { finalExports } = generateExports(escodegen, esprima)(currentPath, readFileSync(currentPath,'utf8'))
    content = content + '\n' + finalExports
  }catch(e){
    d(e)
  }
  return content
}

module.exports = exportLoader;
module.exports.default = exportLoader;

