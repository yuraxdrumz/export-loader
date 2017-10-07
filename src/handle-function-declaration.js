function handleFunctionDeclaration(insertKeyFunc, debug, { id, declarations }){
    let name
    try{
      name = id.name
    }catch(e){
      if(declarations){
        name = declarations[0].init.callee.name
      }
      debug(`Function: name is undefined, check handleFunctionDeclaration`)
    }
    debug(`Function: ${name}`)
    insertKeyFunc(name)
}

module.exports = {
  handleFunctionDeclaration
}