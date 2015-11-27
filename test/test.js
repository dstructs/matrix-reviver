/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	copy = require( 'utils-copy' ),
	matrix = require( 'dstructs-matrix' ),
	revive = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'dstructs-matrix-reviver', function tests() {

	var json;

	beforeEach( function before() {
		json = {};
		json.type = 'Matrix';
		json.data = [1,2,3,4,5,6];
		json.dtype = 'int32';
		json.shape = [3,2];
		json.offset = 0;
		json.strides = [2,1];
		json.raw = false;
	});

	it( 'should export a function', function test() {
		expect( revive ).to.be.a( 'function' );
	});

	it( 'should not affect non-matrix values', function test() {
		var expected,
			actual;

		expected = {
			'beep': 'boop'
		};
		actual = JSON.parse( '{"beep":"boop"}', revive );

		assert.deepEqual( actual, expected );

		// Null edge case:
		actual = JSON.parse( 'null', revive );
		assert.isNull( actual );
	});

	it( 'should require a "type" field equal to "Matrix"', function test() {
		var expected,
			actual;

		json.type = 'Boop';
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should require a "data" field', function test() {
		var expected,
			actual;

		delete json.data;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );

		// Must be an array:
		json.data = null;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should require a "dtype" field', function test() {
		var expected,
			actual;

		delete json.dtype;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );

		// Matrices do not support a generic dtype...
		json.dtype = 'generic';
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should require a "shape" field', function test() {
		var expected,
			actual;

		delete json.shape;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );

		// Must be an array:
		json.shape =  null;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should require a "strides" field', function test() {
		var expected,
			actual;

		delete json.strides;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );

		// Must be an array:
		json.strides = null;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should require a numeric "offset" field', function test() {
		var expected,
			actual;

		delete json.offset;
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );

		json.offset = 'beep';
		expected = copy( json );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if a Matrix has an unrecognized/unsupported "dtype"', function test() {
		json.dtype = 'beep';
		expect( badValue ).to.throw( Error );
		function badValue() {
			JSON.parse( JSON.stringify( json ), revive );
		}
	});

	it( 'should revive a Matrix', function test() {
		var expected,
			actual;

		expected = matrix( json.data, json.shape, json.dtype );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should revive a raw Matrix', function test() {
		var expected,
			actual;

		json.raw = true;
		expected = matrix.raw( new Int32Array( json.data ), json.shape, json.dtype );

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

	it( 'should revive deeply nested Matrices', function test() {
		var expected,
			actual,
			mats;

		mats = [
			matrix( [1,2,3,4], [2,2], 'uint32' ),
			matrix.raw( new Int8Array([1,2,3,4,5,6]), [3,2], 'int8' )
		];

		expected = mats;
		actual = JSON.parse( JSON.stringify( mats ), revive );

		assert.deepEqual( actual, expected );

		expected = {
			'beep': {
				'boop': matrix( json.data, json.shape, json.dtype )
			}
		};
		json = {
			'beep': {
				'boop': json
			}
		};

		actual = JSON.parse( JSON.stringify( json ), revive );

		assert.deepEqual( actual, expected );
	});

});
