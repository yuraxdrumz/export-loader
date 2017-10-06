const debug = require('debug')('parser')

/*TODO
 * check various file types against func to match all possible cases for exporting
 * */
function generateExports(esprima) {
  return function (fileName, data){
    try{
      let names = ``
      let { body } = esprima.parse(data, { sourceType: 'module'})
      for(let declaration of body){
        // debug(declaration)
        if(declaration.type === 'ExportNamedDeclaration'){
          let name
          if(declaration.declaration && declaration.declaration.type === 'FunctionDeclaration'){
            name = declaration.declaration.id.name
            names +=  name
            names += ',\n'
          }else{
            declaration.specifiers.map(spec=>{
              names +=  spec.exported.name
              names += ',\n'
            })

          }

        }
        if(declaration.type === 'ClassDeclaration'){
          let name = declaration.id.name
          debug(`Class: ${name}`)
          if(name[0] === name[0].toUpperCase()){
            names +=  name
            names += ',\n'
          }
        }
        if(declaration.type === 'ExpressionStatement' && declaration.expression.type === 'AssignmentExpression'){
          debug(declaration)
          let name
          try{
            if(declaration.expression && declaration.expression.left && declaration.expression.left.name){
              name = declaration.expression.left.name
            }else{
              name = 'ignoring...'
            }
          }catch(e){
            name =  declaration.expression.callee.name
          }
          debug(`Expression: ${name}`)
          if(name[0] === name[0].toUpperCase()){
            names +=  name
            names += ',\n'
          }
        }else if(declaration.type === 'ExpressionStatement' && declaration.expression.callee.type === 'MemberExpression'){
          void(0)
        }
        else{
          if(declaration.type === 'ExpressionStatement'){
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
            }
          }
        }
        if(declaration.type === 'VariableDeclaration'){
          // debug(declaration.declarations[0].id.name)
          let name
          if(declaration.declarations[0].init.type === 'NewExpression' || declaration.declarations[0].init.type === 'CallExpression'){
            name = declaration.declarations[0].id.name
          }else{
            try{
              name = declaration.declarations[0].init.callee.name
            }catch(e){
              name = declaration.declarations[0].id.name
            }
          }

          debug(`Variable: ${name}`)
          if(name[0] === name[0].toUpperCase()){
            names +=  name
            names += ',\n'
          }        }
        if(declaration.type === 'FunctionDeclaration'){
          let name
          try{
            name = declaration.id.name
          }catch(e){
            name = declaration.declarations[0].init.callee.name
          }
          debug(`Function: ${name}`)
          if(name[0] === name[0].toUpperCase()){
            names +=  name
            names += ',\n'
          }
        }
      }
      names = names.split(',').filter((elem, index, self)=> index == self.indexOf(elem))
      let finalExports = `export {\n${names}}`
      return { finalExports, fileName, names }
    }catch(e){
      debug(`Could not read file: ${fileName}, error :${e}`)
    }
  }
}


module.exports = {
  generateExports,
}
