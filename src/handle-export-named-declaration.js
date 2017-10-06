function handleExportNamedDeclaration(insertKeyFunc, debug, { declaration, specifiers }) {
  let name;
  if (!declaration) throw new Error(`Declaration was not passed in ${__filename}`)
  let { type, id } = declaration
  if(!type && !specifiers) debug(`type and specifiers in ${__filename} were not passed`)
  if ( type === 'FunctionDeclaration' ) {
    name = id.name
    debug(name)
    insertKeyFunc(name)
  }else {
    name = spec.exported.name
    debug(name)
    specifiers.forEach(spec=>insertKeyFunc(name))
  }
}

module.exports = {
  handleExportNamedDeclaration
}