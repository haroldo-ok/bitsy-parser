<h1 align="center">Welcome to bitsy-parser 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/haroldo-ok/bitsy-parser/#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/haroldo-ok/bitsy-parser//graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/haroldo-ok/bitsy-parser//blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/haroldo-ok/bitsy-parser" />
  </a>
  <a href="https://twitter.com/Haroldo0k" target="_blank">
    <img alt="Twitter: Haroldo0k" src="https://img.shields.io/twitter/follow/Haroldo0k.svg?style=social" />
  </a>
</p>

> A parser for turning Bitsy scripts into JS objects, and vice versa.

### 🏠 [Homepage](https://github.com/haroldo-ok/bitsy-parser)

### ✨ [Examples](https://github.com/haroldo-ok/bitsy-parser/tree/master/example)

## Install

```sh
npm install
```

## Usage

In order to convert a bitsy script into a JS object, you can use `parseWorld()`:

```javascript
const {parseWorld} = require('../');
const {readFileSync} = require('fs');

const source = readFileSync('example.bitsy', 'utf8');
const parsedObject = parseWorld(source);
const json = JSON.stringify(parsedObject);

console.log(json);
```

In order to convert a properly structured JS object back into a bitsy script, you can use `serializeWorld()`:

```javascript
const {serializeWorld} = require('../');
const {readFileSync} = require('fs');

const source = readFileSync('example.json', 'utf8');
const parsedObject = JSON.parse(source);
const bitsyScript = serializeWorld(parsedObject);

console.log(bitsyScript);
```

If you prefer to have the dialogs/endings parsed as ASTs, you can add the `parseScripts` options to `parseWorld()`; please, do keep in mind, though, that, as of version `0.0.1`, `serializeWorld()` cannot convert those back into bitsy scripts:

```javascript
const {parseWorld} = require('../');
const {readFileSync} = require('fs');

const source = readFileSync('example.bitsy', 'utf8');
const parsedObject = parseWorld(source, {parseScripts: true});
const json = JSON.stringify(parsedObject);

console.log(json);
```

## Run tests

```sh
npm run test:watch
```

## Author

👤 **Haroldo de Oliveira Pinheiro**

* Website: http://www.haroldo-ok.com/
* Twitter: [@Haroldo0k](https://twitter.com/Haroldo0k)
* Github: [@haroldo-ok](https://github.com/haroldo-ok)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/haroldo-ok/bitsy-parser/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Haroldo de Oliveira Pinheiro](https://github.com/haroldo-ok).<br />
This project is [MIT](https://github.com/haroldo-ok/bitsy-parser//blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
