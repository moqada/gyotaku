# gyotaku

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

Web GYOTAKU ([ウェブ魚拓](http://megalodon.jp/)) client for Node.js.

Unofficial and Implemented by dirty scraping...


## Installation

```
npm install --save gyotaku
```


## Usage


```javascript
import Gyotaku from 'gyotaku';


const gyotaku = new Gyotaku('http://google.com');

// take GYOTAKU
gyotaku.take().then(url => {
  console.log(url);  // http://megalodon.jp/2015-1120-0000-00/google.com/
});

// listing GYOTAKU urls
gyotaku.list().then(urls => {
  console.log(urls);  // ['http://megalodon.jp/2007-1006-1745-56/google.com/', ...]
});

// listing GYOTAKU urls from HTML
Gyotaku.parseListHTML('HTML_STRING_OF_LIST_PAGE');  // ['http://megalodon.jp/2007-1006-1745-56/google.com/', ...]
```


## Related

- [gyotaku-cli](https://github.com/moqada/gyotaku-cli) - CLI for this module


[npm-url]: https://www.npmjs.com/package/gyotaku
[npm-image]: https://img.shields.io/npm/v/gyotaku.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/gyotaku
[npm-download-image]: https://img.shields.io/npm/dt/gyotaku.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/gyotaku
[travis-image]: https://img.shields.io/travis/moqada/gyotaku.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/gyotaku
[daviddm-image]: https://img.shields.io/david/moqada/gyotaku.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/gyotaku#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/gyotaku.svg?style=flat-square
[codecov-url]: https://codecov.io/github/moqada/gyotaku
[codecov-image]: https://img.shields.io/codecov/c/github/moqada/gyotaku.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/gyotaku.svg?style=flat-square
