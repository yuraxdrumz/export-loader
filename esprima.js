const esprima = require('esprima')
const escodegen = require('escodegen')
const debug = require('debug')('parser')
const fs = require('fs')

function generateExportsFromUpperCase(fileName){
  try{
    let data = fs.readFileSync(fileName,'utf8')
    let dataToPushToNewFile = ``
    let names = ``
    let {body} = esprima.parse(data, { sourceType: 'module'})
    for(let declaration of body){
      // debug(declaration)
      // if(declaration.type === 'IfStatement'){
      //   console.log(declaration)
      // }
      if(declaration.type === 'ExpressionStatement' && declaration.expression.callee.type === 'MemberExpression'){
        void(0)
      }else{
        if(declaration.type === 'ExpressionStatement'){
          debug(declaration.expression)
          let name
          try{
            name = declaration.expression.callee.id.name
          }catch(e){
            name =  declaration.expression.callee.name
          }
          debug(`Expression: ${name}`)
          if(name[0] === name[0].toUpperCase()){
            names +=  name
            names += ',\n'
            let newCode = escodegen.generate(declaration)
            dataToPushToNewFile += newCode
            dataToPushToNewFile += '\n'
          }
        }
      }

      if(declaration.type === 'VariableDeclaration'){
        // debug(declaration)
        let name
        try{
          name = declaration.declarations[0].init.callee.name
        }catch(e){
          name = declaration.declarations[0].id.name
        }
        debug(`Variable: ${name}`)
        if(name[0] === name[0].toUpperCase()){
          names += name
          names += ',\n'
          let newCode = escodegen.generate(declaration)
          dataToPushToNewFile += newCode
          dataToPushToNewFile += '\n'
        }
      }
      if(declaration.type === 'FunctionDeclaration'){
        let name
        try{
          name = declaration.id.name
        }catch(e){
          name = declaration.declarations[0].init.callee.name
        }
        debug(`Function: ${name}`)
        if(name[0] === name[0].toUpperCase()){
          names += name
          names += ',\n'
          let newCode = escodegen.generate(declaration)
          dataToPushToNewFile += newCode
          dataToPushToNewFile += '\n'
        }
      }
    }
    let finalExports = `
export {
  ${names}
}
`
    return {
      finalExports,
      fileName,
      names
    }
  }catch(e){
    debug(`Could not read file: ${fileName}, error :${e}`)
  }
}

module.exports = {
  generateExportsFromUpperCase
}
