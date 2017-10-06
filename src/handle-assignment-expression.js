function handleAssignmentExpression(insertKeyFunc, debug, expression){
  let name
  try{
    if(expression && expression.left && expression.left.name){
      name = expression.left.name
    }else{
      name = 'ignoring...'
    }
  }catch(e){
    name =  expression.callee.name
  }
  debug(`Expression: ${name}`)
  insertKeyFunc(name)
}

module.exports = {
  handleAssignmentExpression
}