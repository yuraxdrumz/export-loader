// handlers
const { handleExportNamedDeclaration } = require('../src/handle-export-named-declaration')
const { handleClassDeclaration }       = require('../src/class-declaration')
const { handleExpressionStatement }    = require('../src/handle-expression-statement')
const { handleVariableDeclaration }    = require('../src/handle-variable-declaration')
const { handleFunctionDeclaration }    = require('../src/handle-function-declaration')
const { handleDefaultExpression }      = require('../src/handle-default-expression')
const { handleAssignmentExpression }   = require('../src/handle-assignment-expression')

// utils
const { variableDeclaration } = require('../test-utils/var-declaration.example')
const { functionDeclaration } = require('../test-utils/function-declaration.example')



//tests
const insertNameFunction = jest.fn()
test('should handle variable declaration and call insert name', () => {
  expect(handleVariableDeclaration(insertNameFunction,console.log,variableDeclaration)).toBeFalsy()
  expect(insertNameFunction.mock.calls[0]).toEqual([variableDeclaration.declarations[0].id.name])
});

test('should handle function declaration and call insert name', () => {
  expect(handleFunctionDeclaration(insertNameFunction,console.log,functionDeclaration)).toBeFalsy()
  expect(insertNameFunction.mock.calls[1]).toEqual([functionDeclaration.id.name])
});

