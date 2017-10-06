const debug                            = require('debug')('parser')
const { handleExportNamedDeclaration } = require('./handle-export-named-declaration')
const { handleClassDeclaration }       = require('./class-declaration')
const { handleExpressionStatement }    = require('./handle-expression-statement')
const { handleVariableDeclaration }    = require('./handle-variable-declaration')
const { handleFunctionDeclaration }    = require('./handle-function-declaration')
/*TODO
 * check various file types against func to match all possible cases for exporting
 * */
function generateExports(esprima) {
  return function (fileName, data){
    try{
      let names = {}
      const insertName = hashMapToInject(names)
      const { body } = esprima.parse( data, { sourceType: 'module'} )
      for( let declaration of body ) {
        const { type } = declaration
        switch ( type ) {
          case 'ExportNamedDeclaration':
            handleExportNamedDeclaration(insertName, debug, declaration)
            break
          case 'ClassDeclaration':
            handleClassDeclaration(insertName, debug, declaration)
            break
          case 'ExpressionStatement':
            handleExpressionStatement(insertName, debug, declaration)
            break
          case 'VariableDeclaration':
            handleVariableDeclaration(insertName, debug, declaration)
            break
          case 'FunctionDeclaration':
            handleFunctionDeclaration(insertName, debug, declaration)
            break
          default:
            debug(`An unhandled declaration type received: ${type}`)
        }
      }
      debug(names)
      const finalExports = `export {\n${Object.keys(names)}\n}`
      return { finalExports, fileName, names:Object.keys(names) }
    }catch(e){
      debug(`Could not read file: ${fileName}, error :${e}`)
    }
  }
}
function hashMapToInject(hashmap){
  return function insertName(name){
    if(hashmap[name]){
      d(`key:${name} already exists!`)
    }else{
      hashmap[name] = name
    }
  }
}


module.exports = {
  generateExports,
}
