const {parseWorld} = require('../');
const {readFileSync} = require('fs');
const stringify = require("json-stringify-pretty-compact");

const source = readFileSync('red-dog-endless-spaceship.bitsy', 'utf8');
const parsedObject = parseWorld(source, {parseScripts: true});
const json = stringify(parsedObject, {maxLength: 160});

console.log(json);
