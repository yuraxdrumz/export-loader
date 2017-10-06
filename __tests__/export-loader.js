process.env.DEBUG = 'norequire'
const { generateExports } = require('../esprima')
const exportLoader = require('../export-loader')
const fs = require('fs');
const escodegen = require('escodegen');
const esprima = require('esprima');
const path = require('path')

const data = `const Public = 'awsome'
  const notPublic = function(){
    console.log('this is private because the name is not capitalized!')
  }
  function SoPublic(){
    console.log('blaaa')
  }
`

test('should return func when called', () => {
  expect(generateExports(escodegen, esprima)).toBeInstanceOf(Function)
});

test('should return undefined when given unexisting file path', () => {
  expect(generateExports(escodegen, esprima)()).toBeUndefined()
});

test('should return object with filename, fields to be exported and string of export with fields to add to file content', () => {

  expect(generateExports(escodegen, esprima)(__filename, data)).toMatchSnapshot()
});

test('should return content passed with exports on it', () => {
  expect(exportLoader(data)).toMatchSnapshot()
});
