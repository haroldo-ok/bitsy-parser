
const {parseWorld, serializeWorld} = require('../');
const {readFileSync} = require('fs');


test('Checks if conversion of minimal.bitsy works correctly both ways.', () => {

  const source = readFileSync('test/minimal.bitsy', 'utf8');
  const parsedData = parseWorld(source);
  const serializedData = serializeWorld(parsedData);
	
  expect(serializedData).toBe(source);
});


test('Checks if conversion of red-dog-endless-spaceship.bitsy works correctly both ways.', () => {

  const source = readFileSync('test/red-dog-endless-spaceship.bitsy', 'utf8');
  const parsedData = parseWorld(source);
  const serializedData = serializeWorld(parsedData);
	
  expect(serializedData).toBe(source);
});