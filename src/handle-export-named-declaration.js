function handleExportNamedDeclaration(insertKeyFunc, debug, { declaration, specifiers }) {
  let name;
  let type
  let id

  if(declaration){
    type = declaration.type
    id = declaration.id
  }
  if ( type && type === 'FunctionDeclaration' ) {
    name = id.name
    insertKeyFunc(name)
  }else {
    try{
      specifiers.map(spec=>insertKeyFunc(spec.exported.name))
    }catch(e){
      debug(`error in handleExportNamed:${JSON.stringify(e)}`)
    }
  }
}

module.exports = {
  handleExportNamedDeclaration
}