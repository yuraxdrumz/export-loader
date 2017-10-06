process.env.DEBUG = 'norequire'
const { generateExports } = require('../esprima')
const exportLoader = require('../export-loader')
const fs = require('fs');
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
  expect(generateExports(esprima)).toBeInstanceOf(Function)
});

test('should return undefined when given unexisting file path', () => {
  expect(generateExports(esprima)()).toBeUndefined()
});

test('should return object with filename, fields to be exported and string of export with fields to add to file content', () => {

  expect(generateExports(esprima)(__filename, data)).toMatchSnapshot()
});

test('should return content passed with exports on it', () => {
  expect(exportLoader(data)).toMatchSnapshot()
});
