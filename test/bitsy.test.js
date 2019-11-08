
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


test('Checks if old JSON from version 0.0.1 still gets serialized correctly.', () => {

  const bitsySource = readFileSync('test/minimal.bitsy', 'utf8');
  const source = readFileSync('test/old.0.0.1.json', 'utf8');
  const serializedData = serializeWorld(source);
	
  expect(serializedData).toBe(bitsySource);
});