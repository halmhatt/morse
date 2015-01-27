var morse = require('../');
var assert = require('assert');

describe('array', function() {
	it('should encode and decode an array', function() {
		var arr = [
		  'hello',
		  'world'
		];

		var encoded = morse.encode(arr);
		var decoded = morse.decode(encoded);

		assert.deepEqual(decoded, arr.map(function(str) {
			return str.toUpperCase();
		}), 'Arrays should be equal except for case');
	});
});
