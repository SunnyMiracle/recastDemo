console.log('a ing');

exports.a = 'a value before';
const b = require('./b');

exports.a = 'a value';

console.log('in a, b =', b);

console.log('a done');
