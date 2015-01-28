#morse

A simple Morse code library for node

![Samuel F.B. Morse](http://i.imgur.com/HHHTQ.jpg)

## install

For use as a CLI:

    npm install -g morse

For use as a library:

    npm install morse

## example usage as a CLI

````
$ morse -h
Usage: morse [options] string

Options:
  -d, --decode  Decode a string of Morse code  [boolean]
  -h, --help    Show this text 
  -p, --pipe    Use stdin and pipe to stdout 

$ morse hello > hello.txt
$ morse -d "`cat hello.txt`"
HELLO
````

### using pipes
You can use pipes to pipe text into morse with the `-p` flag or `--pipe`. Encode:
```bash
$ echo "Hello morse" | morse -p
.... . .-.. .-.. --- ....... -- --- .-. ... . ?
```

Decode:
```bash
$ echo ".... . .-.. .-.. --- ....... -- --- .-. ... . ?" | morse -p -d
HELLO MORSE
```

Pipe twice for fun
```bash
$ echo "Hello morse" | morse -p | morse -p -d
HELLO MORSE
```

## example usage as a library

````javascript
var morse = require('morse');

var encoded = morse.encode('Hello, world.');
// .... . .-.. .-.. --- --..-- ....... .-- --- .-. .-.. -.. .-.-.-

morse.decode(encoded);
// HELLO, WORLD.
````

````javascript
var encoded = morse.encode([ 'hello', 'world' ]);
// [ '.... . .-.. .-.. ---', '.-- --- .-. .-.. -..' ]

morse.decode(encoded);
// [ 'HELLO', 'WORLD' ]
````

### example usage with streams

```javascript
var morse = require('morse');
var fs = require('fs');

// Encode
fs.createReadStream(__dirname + '/file.txt')
  .pipe(morse.createEncodeStream())
  .pipe(process.stdout);

// Decode
fs.createReadStream(__dirname + '/file-encoded.txt')
  .pipe(morse.createDecodeStream())
  .pipe(process.stdout);
```

## methods

### morse.encode(obj)

Encodes and returns a given string or array

### morse.decode(obj, dichotomic)

Decodes and returns a string or array

`dichotomic` defaults to false. If passed true, it will use a tree-based approach to decode the string or array. If false, a basic iteration of the map is used.

The dichotomic approach looks like this:

![](http://i.imgur.com/Y1bnV.png)

The implementation does not include spaces right now, so it fails its test. However, it is otherwise accurate.

````javascript
morse.decode(
  morse.encode('Hello, world.'),
  true
);
// HELLO,5WORLD.
````

## attributes

### morse.map

An object containing `letter: morse` translations contained in `map.js`

### morse.tree

A tree-modeled object contained in `tree.js`

## license

MIT
