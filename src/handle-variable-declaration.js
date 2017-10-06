function handleVariableDeclaration(insertKeyFunc, debug, { declarations }){
  let name
  if(!declarations[0].init.type) throw new Error(`Declarations was not passed in ${__filename}`)
  switch (declarations[0].init.type){
    case 'NewExpression':
    case 'CallExpression':
      name = declarations[0].id.name
      break
    default:
      try{
        name = declarations[0].init.callee.name
      }catch(e){
        name = declarations[0].id.name
      }
  }
  debug(`Variable: ${name}`)
  insertKeyFunc(name)
}

module.exports = {
  handleVariableDeclaration
}