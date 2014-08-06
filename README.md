# sweetbuild [![npm version](https://img.shields.io/npm/v/sweetbuild.svg?style=flat)](https://www.npmjs.org/package/sweetbuild) [![npm downloads](https://img.shields.io/npm/dm/sweetbuild.svg?style=flat)](https://www.npmjs.org/package/sweetbuild) [![Dependency Status](https://img.shields.io/gemnasium/myfreeweb/broccoli-sweetbuild.svg?style=flat)](https://gemnasium.com/myfreeweb/broccoli-sweetbuild) [![WTFPL](https://img.shields.io/badge/license-WTFPL-brightgreen.svg?style=flat)](https://www.tldrlegal.com/l/wtfpl)

A [Sweet.js] DSL for [Broccoli], the best frontend asset pipeline.

[Sweet.js]: http://sweetjs.org
[Broccoli]: https://github.com/broccolijs/broccoli

## Usage

```bash
$ npm install --save-dev sweet.js sweetbuild broccoli broccoli-merge-trees
```

Put the following in `Brocfile.js`:

```js
require('sweet.js').loadMacro('sweetbuild');
module.exports = require('./Brocfile.sjs');
```

Put your build script in `Brocfile.sjs` (or whatever you required in `Brocfile.js`) and use Broccoli like you normally do.

### The macros

#### use

A shorthand for `require`.
Requires `some_thing` from `broccoli-some-thing`.

```js
use source_map; // requires broccoli-source-map as source_map
```

#### +++ and +!+

Operators that merge trees using [broccoli-merge-trees].
They are left-associative.
`+!+` is the `{overwrite: true}` version.
You can use both single trees and lists of trees at both sides.

```js
var scripts = 'src' +++ 'vendor/src';
var styles = ['normalize', 'formalize'].map(function(x) {return 'bower_components/' + x}) +++ ['stylesheets', 'ie-stylesheets'] +!+ 'vendor/stylesheets';
```

[broccoli-merge-trees]: https://github.com/broccolijs/broccoli-merge-trees

#### ->

The chain operator.
Like the UNIX pipe for plugin calls.
Best understood by example:

```js
var scripts = 'src/main/coffee' -> coffee({bare: true}) -> uglify_js;
// same as:
var scripts = uglify_js(coffee('src/main/coffee', {bare: true}));
```

### A complete example

```js
use coffee;
use uglify_js;
use sass;
use manifest;

var scripts = 'vendor/js' +++ ('cs' -> coffee)
	-> uglify_js;

var styles = 'vendor/css' +++ ('vendor/sass' +++ 'sass'
	-> sass('main.scss', 'main.css'));

var assets = scripts +++ styles;

module.exports = assets +++ manifest(assets);
```

## License

Copyright © 2014 [myfreeweb](https://github.com/myfreeweb)
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
