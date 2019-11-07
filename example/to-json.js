const {parseWorld} = require('./index');
const {readFileSync} = require('fs');
const stringify = require("json-stringify-pretty-compact");

const source = readFileSync('minimal.bitsy', 'utf8');
const parsedObject = parseWorld(source);
const json = stringify(parsedObject, {maxLength: 160});

console.log(json);
