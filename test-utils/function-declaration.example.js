let functionDeclaration = {
  "type": "FunctionDeclaration",
  "id": {
    "type": "Identifier",
    "name": "Bla"
  },
  "params": [],
  "body": {
    "type": "BlockStatement",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
              "type": "Identifier",
              "name": "console"
            },
            "property": {
              "type": "Identifier",
              "name": "log"
            }
          },
          "arguments": [
            {
              "type": "Literal",
              "value": 1,
              "raw": "1"
            }
          ]
        }
      }
    ]
  },
  "generator": false,
  "expression": false,
  "async": false
}
module.exports = {
  functionDeclaration
}