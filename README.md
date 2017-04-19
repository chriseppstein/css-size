# css-size [![Build Status](https://travis-ci.org/ben-eb/css-size.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/css-size.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/css-size.svg)][deps]

> Compare the size of a CSS file after processing it to the original.

Results are shown for uncompressed as well as when compressed using gzip
and brotli. For most users, one of the compressed sizes will best
represent what will be served to a client in production. It also
provides a better comparison between the minified and the original CSS.

CSS is expected to processed by [`postcss`] plugins but can be used with
any processing code that returns a promise that resolves to an object
with a `css` property.


## Install

With [npm](https://npmjs.org/package/css-size) do:

```
npm install css-size --save
```


## Example

```js
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var nano = require('cssnano');
var css = 'h1 {\n  color: black;\n}\n';
var nanoOpts = {};
var cssSize = require("css-size");

function process(css, options) {
  return postcss([ autoprefixer, nano(options) ]).process(css);
}


cssSize(css, nanoOpts, process).then(function (results) {
    console.log(results);

/*
  { uncompressed:
     { original: '23 B',
       processed: '14 B',
       difference: '9 B',
       percent: '60.87%' },
    gzip:
     { original: '43 B',
       processed: '34 B',
       difference: '9 B',
       percent: '79.07%' },
    brotli:
     { original: '27 B',
       processed: '16 B',
       difference: '11 B',
       percent: '59.26%' } }
*/

});

cssSize.table(css, nanoOpts, process).then(function (table) {
    console.log(table);

/*
    ┌────────────┬──────────────┬────────┬────────┐
    │            │ Uncompressed │ Gzip   │ Brotli │
    ├────────────┼──────────────┼────────┼────────┤
    │ Original   │ 23 B         │ 43 B   │ 27 B   │
    ├────────────┼──────────────┼────────┼────────┤
    │ Processed  │ 14 B         │ 34 B   │ 16 B   │
    ├────────────┼──────────────┼────────┼────────┤
    │ Difference │ 9 B          │ 9 B    │ 11 B   │
    ├────────────┼──────────────┼────────┼────────┤
    │ Percent    │ 60.87%       │ 79.07% │ 59.26% │
    └────────────┴──────────────┴────────┴────────┘
*/

});
```


## API

### `cssSize(cssProcessor, input, options)`

Pass a string (or Buffer) of CSS to receive an object with information about the original &
minified sizes (uncompressed, gzipped, and brotli'd), plus difference and percentage results. The
options object is passed through to the processor should you wish to compare sizes
using different options than the defaults.

### `cssSize.table(cssProcessor, input, options)`

Use the table method instead to receive the results as a formatted table.

#### input

Type: `string`, `buffer`

### CLI

See the available options with:

```sh
$ css-size --help
```


## Related

* [`js-size`]: Display the size of a JS file.
* [`gzip-size`]: Calculate the size of a string after compression with gzip.
* [`brotli-size`]: Calculate the size of a string after compression with brotli.


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Ben Briggs](http://beneb.info)


[ci]:          https://travis-ci.org/ben-eb/css-size
[deps]:        https://gemnasium.com/ben-eb/css-size
[npm]:         http://badge.fury.io/js/css-size

[`cssnano`]:   https://github.com/ben-eb/cssnano
[`postcss`]:   https://github.com/postcss/postcss
[`js-size`]:   https://github.com/lukekarrys/js-size
[`gzip-size`]: https://github.com/sindresorhus/gzip-size
[`brotli-size`]: https://github.com/erwinmombay/brotli-size
