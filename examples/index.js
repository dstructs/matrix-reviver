'use strict';

var matrix = require( 'dstructs-matrix' ),
	revive = require( './../lib' );

var data = new Int8Array( 10 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
var mat1 = matrix( data, [5,2] );
console.log( mat1 );
/*
    [ 0 1
      2 3
      4 5
      6 7
      8 9 ]
*/

var mstr = JSON.stringify( mat1 );
console.log( mstr );
// returns '{"type":"Matrix","dtype":"int8","shape":[5,2],"offset":0,"strides":[2,1],"raw":false,"data":[0,1,2,3,4,5,6,7,8,9]}'

var mat2 = JSON.parse( mstr, revive );
console.log( mat2 );
/*
    [ 0 1
      2 3
      4 5
      6 7
      8 9 ]
*/
