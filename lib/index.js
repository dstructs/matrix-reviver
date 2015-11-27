'use strict';

// MODULES //

var Matrix = require( 'dstructs-matrix' ),
	cast = require( 'compute-cast-arrays' ),
	isArray = require( 'validate.io-array' ),
	isNumber = require( 'validate.io-number-primitive' );


// CONSTRUCTORS //

var rawmatrix, matrix;

rawmatrix = new Matrix.raw( [0,0] ).constructor;
matrix = new Matrix( [0,0] ).constructor;


// MATRIX REVIVER //

/**
* FUNCTION: revive( key, value )
*	Revives a JSON-serialized Matrix.
*
* @param {String} key - key
* @param {*} value - value
* @returns {*|Matrix} value or a Matrix instance
*/
function revive( key, value ) {
	var ctor, d;
	if (
		value &&
		value.type === 'Matrix' &&
		isArray( value.data ) &&
		value.dtype &&
		value.dtype !== 'generic' &&
		isArray( value.shape ) &&
		isArray( value.strides ) &&
		isNumber( value.offset )
	) {
		if ( value.raw ) {
			ctor = rawmatrix;
		} else {
			ctor = matrix;
		}
		d = cast( value.data, value.dtype );
		return ctor( d, value.dtype, value.shape, value.offset, value.strides );
	}
	return value;
} // end FUNCTION revive()


// EXPORTS //

module.exports = revive;
