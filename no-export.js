const { generateExportsFromUpperCase } = require('./esprima')
const d = require('debug')('norequire')

function exportLoader(content) {
  let currentPath = this.resourcePath
  let fileWithExports = generateExportsFromUpperCase(currentPath)
  try{
    content += '\n'
    content += fileWithExports.finalExports
  }catch(e){
    d(e)
  }

  return content
}

module.exports = exportLoader;
module.exports.default = exportLoader;

