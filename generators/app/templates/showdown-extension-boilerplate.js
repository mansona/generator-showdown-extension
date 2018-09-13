/**
 * Showdown's Extension boilerplate
 *
 * A boilerplate from where you can easily build extensions
 * for showdown
 */

import showdown from 'showdown';

// This is the extension code per se

// Here you have a safe sandboxed environment where you can use "static code"
// that is, code and data that is used accros instances of the extension itself
// If you have regexes or some piece of calculation that is immutable
// this is the best place to put them.

// The following method will register the extension with showdown
showdown.extension('<%= pluginName %>', () => ({
  type: 'lang', // or output
  filter(text, converter, options) {
    // your code here
    // ...
    // text is the text being parsed
    // converter is an instance of the converter
    // ...
    // don't forget to return the altered text. If you don't, nothing will appear in the output
    return text;
  },
  regex: /foo/g, // if filter is present, both regex and replace properties will be ignored
  replace: 'bar',
}));
