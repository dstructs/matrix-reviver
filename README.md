Matrix Reviver
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Revives a JSON-serialized [Matrix][matrix].


## Installation

``` bash
$ npm install dstructs-matrix-reviver
```


## Usage

``` javascript
var revive = require( 'dstructs-matrix-reviver' );
```

#### revive( key, value )

Revives a JSON-serialized [Matrix][matrix].

``` javascript
var str = '{"type":"Matrix","dtype":"float32","shape":[2,2],"offset":0,"strides":[2,1],"raw":true,"data":[0,0,0,0]}';

var mat = JSON.parse( str, revive );
/*
    [ 0 0
      0 0 ]
*/
```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	revive = require( 'dstructs-matrix-reviver' );

var data = new Int8Array( 10 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
var mat1 = matrix( data, [5,2] );
/*
    [ 0 1
      2 3
      4 5
      6 7
      8 9 ]
*/

var mstr = JSON.stringify( mat1 );
// returns '{"type":"Matrix","dtype":"int8","shape":[5,2],"offset":0,"strides":[2,1],"raw":false,"data":[0,1,2,3,4,5,6,7,8,9]}'

var mat2 = JSON.parse( mstr, revive );
/*
    [ 0 1
      2 3
      4 5
      6 7
      8 9 ]
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha][mocha] test framework with [Chai][chai] assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/dstructs-matrix-reviver.svg
[npm-url]: https://npmjs.org/package/dstructs-matrix-reviver

[travis-image]: http://img.shields.io/travis/dstructs/matrix-reviver/master.svg
[travis-url]: https://travis-ci.org/dstructs/matrix-reviver

[codecov-image]: https://img.shields.io/codecov/c/github/dstructs/matrix-reviver/master.svg
[codecov-url]: https://codecov.io/github/dstructs/matrix-reviver?branch=master

[dependencies-image]: http://img.shields.io/david/dstructs/matrix-reviver.svg
[dependencies-url]: https://david-dm.org/dstructs/matrix-reviver

[dev-dependencies-image]: http://img.shields.io/david/dev/dstructs/matrix-reviver.svg
[dev-dependencies-url]: https://david-dm.org/dev/dstructs/matrix-reviver

[github-issues-image]: http://img.shields.io/github/issues/dstructs/matrix-reviver.svg
[github-issues-url]: https://github.com/dstructs/matrix-reviver/issues

[mocha]: http://mochajs.org/
[chai]: http://chaijs.com
[istanbul]: https://github.com/gotwarlost/istanbul

[matrix]: https://github.com/dstructs/matrix
