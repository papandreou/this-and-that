# this-and-that

Render a list of items as dictated by the locale. The formats are extracted from [the CLDR](http://cldr.unicode.org/development/development-process/design-proposals/list-formatting).

## Installation

```
npm install this-and-that
```

## Syntax

```
thisAndThat(itemsArray, localeId = 'en-US', format = 'default')
```

The `format` parameter can be either `default`, `or`, `standardShort`, `unit`, `unitNarrow`, or `unitShort`.

Returns a string with the formatted list items.

## Examples

```
const thisAndThat = require('this-and-that');

// Default list format in American English:
console.log(thisAndThat(['foo', 'bar', 'quux'], 'en-US'));
// foo, bar, and quux

// The "or" format:
console.log(thisAndThat(['foo', 'bar', 'quux'], 'en-US', 'or'));
// foo, bar, or quux

// The "default" format in Arabic:
console.log(thisAndThat(['foo', 'bar', 'quux'], 'ar'))
// foo، bar، وquux

// The "unitShort" format in Arabic:
console.log(thisAndThat(['foo', 'bar', 'quux'], 'ar', 'unitShort'))
// foo، وbar، وquux
```
