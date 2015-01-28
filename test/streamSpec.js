var morse = require('../');
var assert = require('assert');
var fs = require('fs');
var through2 = require('through2');

// Saves everything in .result
function StringStream() {
  this.result = '';
}

StringStream.prototype.createStream = function() {
  var _this = this;

  return through2({}, function(chunk, enc, callback) {
    _this.result += chunk.toString();
    callback(null, chunk);
  }, function(callback) {
    callback();
  });
}

describe('stream', function() {

  it('should encode a stream', function(done) {

    fs.readFile(__dirname + '/lorem-ipsum.txt', 'utf8', function(err, text) {
      if(err) return console.error(err);

      var encoded = morse.encode(text);

      var stringStream = new StringStream();

      // Test it with streams
      var readStream = fs.createReadStream(__dirname + '/lorem-ipsum.txt', {encoding: 'utf8'});
      readStream
        .pipe(morse.createEncodeStream())
        .pipe(stringStream.createStream())
        .on('finish', function() {

          assert.equal(stringStream.result, encoded);
          done();
        });
    });
  });


  it('should decode a stream', function(done) {
    fs.readFile(__dirname + '/lorem-ipsum-encoded.txt', 'utf8', function(err, text) {
      if(err) return console.error(err);

      var decoded = morse.decode(text);

      var stringStream = new StringStream();

      // Test it with streams
      var readStream = fs.createReadStream(__dirname + '/lorem-ipsum-encoded.txt', {encoding: 'utf8'});
      readStream
        .pipe(morse.createDecodeStream())
        .pipe(stringStream.createStream())
        .on('finish', function() {

          assert.equal(stringStream.result, decoded);
          done();
        });
    });
  });
});