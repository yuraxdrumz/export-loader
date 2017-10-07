const { generateExports } = require('./esprima')
const d                   = require('debug')('norequire')
const esprima             = require('esprima')
const { readFileSync }    = require('fs')
const path                = require('path')

// main loader func, calls generateExports with dependencies
// which returns a func with a parser inside
function exportLoader(content) {
  try{
    let currentPath = this.resourcePath || path.resolve("./test-utils/resourcePath.js")
    let { finalExports } = generateExports(esprima)(currentPath, readFileSync(currentPath,'utf8'))
    d(`finalExports is: ${finalExports}`)
    content = content.replace(/(export function|export async function)/g,'function').replace(/^export.{([\s\S]*?)}$/gm, '')
    content = content + '\n' + finalExports
    d(content)
  }catch(e){
    d(`Failed on export loader main func with error:${JSON.stringify(e)}`)
  }
  return content
}

module.exports = exportLoader;
module.exports.default = exportLoader;

