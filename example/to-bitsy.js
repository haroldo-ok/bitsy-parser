const {serializeWorld} = require('../');
const {readFileSync} = require('fs');

const source = readFileSync('example.json', 'utf8');
const parsedObject = JSON.parse(source);
const bitsyScript = serializeWorld(parsedObject);

console.log(bitsyScript);
