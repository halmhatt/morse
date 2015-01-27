#!/usr/bin/env node
var morse = require('../');
var optimist = require('optimist');
var argv = optimist
  .usage('Usage: $0 [options] string')
  .boolean('d')
  .alias('d', 'decode')
  .describe('d', 'Decode a string of Morse code')
  .alias('h', 'help')
  .describe('h', 'Show this text')
  .alias('p', 'pipe')
  .describe('p', 'Use stdin and pipe to stdout')
  .argv;

if (argv.h || (!argv._.length && !argv.p)) {
  optimist.showHelp();
  process.exit();
}

// Check for pipe
if(argv.p) {
  if(argv.d) {
    process.stdin.pipe(morse.createDecodeStream()).pipe(process.stdout);
  } else {
    process.stdin.pipe(morse.createEncodeStream()).pipe(process.stdout);
  }
}

var str = argv._.join(' ');
if (argv.d) {
  console.log(morse.decode(str));
} else {
  console.log(morse.encode(str));
}
