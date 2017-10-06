function handleClassDeclaration(insertKeyFunc, debug, { id }){
  if(!id) debug(`id was not passed in ${__filename}`)
  let { name } = id
  debug(`Class: ${name}`)
  insertKeyFunc(name)
}

module.exports = {
  handleClassDeclaration
}