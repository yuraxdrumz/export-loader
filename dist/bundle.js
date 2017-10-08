module.exports=function(e){function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n){e.exports=require("debug")},function(e,n,t){"use strict";function r(e){try{var n=this.resourcePath||u.resolve("./test-utils/resourcePath.js"),t=i(s)(n,l(n,"utf8")),r=t.finalExports;o("finalExports is: "+r),e=e.replace(/export function/g,"function").replace(/export async function/g,"async function").replace(/^export.{([\s\S]*?)}$/gm,""),e=e+"\n"+r,o(e)}catch(e){o("Failed on export loader main func with error:"+e)}return e}var a=t(2),i=a.generateExports,o=t(0)("norequire"),s=t(10),c=t(11),l=c.readFileSync,u=t(12);e.exports=r,e.exports.default=r},function(e,n,t){"use strict";function r(e){return function(n,t){if(!t)throw new Error("No data was received!");var r={},o=a(r),c=e.parse(t,{sourceType:"module"}),u=c.body,f=!0,d=!1,h=void 0;try{for(var y,v=u[Symbol.iterator]();!(f=(y=v.next()).done);f=!0){var E=y.value,b=E.type;switch(i(b),b){case"ExportNamedDeclaration":s(o,i,E);break;case"ClassDeclaration":l(o,i,E);break;case"ExpressionStatement":p(o,i,E);break;case"VariableDeclaration":x(o,i,E);break;case"FunctionDeclaration":m(o,i,E);break;case"ExportDefaultDeclaration":i("Export default received, need to think what to do with it");break;default:i("An unhandled declaration type received: "+b)}}}catch(e){d=!0,h=e}finally{try{!f&&v.return&&v.return()}finally{if(d)throw h}}i("names:"+JSON.stringify(r));var D=Object.keys(r);return{finalExports:"export {\n"+D+"\n}",fileName:n,names:D}}}function a(e){return function(n,t){"string"!=typeof n&&i("name: "+JSON.stringify(n)+" is not a string!!!"),(n[0]===n[0].toUpperCase()||t)&&(e[n]?d("key:"+n+" already exists!"):e[n]=n)}}var i=t(0)("parser"),o=t(3),s=o.handleExportNamedDeclaration,c=t(4),l=c.handleClassDeclaration,u=t(5),p=u.handleExpressionStatement,f=t(8),x=f.handleVariableDeclaration,h=t(9),m=h.handleFunctionDeclaration;e.exports={generateExports:r,hashMapToInject:a}},function(e,n,t){"use strict";function r(e,n,t){var r=t.declaration,a=t.specifiers,i=void 0,o=void 0,s=void 0;if(r&&(o=r.type,s=r.id),o&&"FunctionDeclaration"===o)i=s.name,e(i,!0);else try{a.map(function(n){return e(n.exported.name)})}catch(e){n("error in handleExportNamed:"+JSON.stringify(e))}}e.exports={handleExportNamedDeclaration:r}},function(e,n,t){"use strict";(function(n){function t(e,t,r){var a=r.id;a||t("id was not passed in "+n);var i=a.name;t("Class: "+i),e(i)}e.exports={handleClassDeclaration:t}}).call(n,"/index.js")},function(e,n,t){"use strict";function r(e,n,t){var r=t.expression;if(n("expression from handler is "+JSON.stringify(r)),r.callee&&"MemberExpression"===r.callee.type);else switch(r.type){case"AssignmentExpression":i(e,n,r);break;default:s(e,n,r)}}var a=t(6),i=a.handleAssignmentExpression,o=t(7),s=o.handleDefaultExpression;e.exports={handleExpressionStatement:r}},function(e,n,t){"use strict";function r(e,n,t){var r=void 0;try{r=t&&t.left&&t.left.name?t.left.name:"ignoring..."}catch(e){r=t.callee.name}n("Expression: "+r),e(r)}e.exports={handleAssignmentExpression:r}},function(e,n,t){"use strict";function r(e,n,t){var r=void 0;try{r=t.callee.id.name}catch(e){r=t.callee.name}n("Expression: "+r),e(r)}e.exports={handleDefaultExpression:r}},function(e,n,t){"use strict";function r(e,n,t){var r=t.declarations,a=void 0;switch(r[0].init&&r[0].init.type?r[0].init.type:r[0].type){case"NewExpression":case"CallExpression":case"VariableDeclarator":case"VariableDeclaration":a=r[0].id.name;break;default:try{a=r[0].init.callee.name}catch(e){a=r[0].id.name}}n("Variable: "+a),e(a)}e.exports={handleVariableDeclaration:r}},function(e,n,t){"use strict";function r(e,n,t){var r=t.id,a=t.declarations,i=void 0;try{i=r.name}catch(e){a&&(i=a[0].init.callee.name),n("Function: name is undefined, check handleFunctionDeclaration")}n("Function: "+i),e(i)}e.exports={handleFunctionDeclaration:r}},function(e,n){e.exports=require("esprima")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("path")}]);