var morse = require('./');
var fs = require('fs');
var Q = require('q');


Q.fcall(function() {
	var defered = Q.defer();

	console.log('Readfile');
	console.time('readfile');

	fs.readFile(__dirname + '/test/largetext.txt', 'utf8', function(err, text) {
		if(err) return console.error(err);

		var encoded = morse.encode(text);
		console.timeEnd('readfile');

		var decoded = morse.decode(encoded);

		defered.resolve();
	});

	return defered.promise;
})
.then(function() {
	var defered = Q.defer();
	console.log('Stream');

	// Using streams
	console.time('stream');
	var readStream = fs.createReadStream(__dirname + '/test/largetext.txt');

	readStream.pipe(morse.createEncodeStream()).pipe(morse.createDecodeStream()).on('finish', function() {
	  console.timeEnd('stream');
	  defered.resolve();
	});

	return defered.promise;
});
