
const {parseWorld, serializeWorld} = require('./index');

const {readFileSync} = require('fs');

test('Checks if conversion of minimal.bitsy works correctly both ways.', () => {

  const source = readFileSync('minimal.bitsy', 'utf8');
  const parsedData = parseWorld(source);
  //console.log(JSON.stringify(parsedData, null, 2));
  const serializedData = serializeWorld(parsedData);
	
  expect(serializedData).toBe(source);
});