const {serializeWorld} = require('./index');
const {readFileSync} = require('fs');

const source = readFileSync('result.json', 'utf8');
const parsedObject = JSON.parse(source);
const bitsyScript = serializeWorld(parsedObject);

console.log(bitsyScript);
