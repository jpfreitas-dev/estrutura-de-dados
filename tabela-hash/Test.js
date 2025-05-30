const HashTable = require('./HashTable');

const table = new HashTable();

table.set('key1', 'value1');
table.set('key2', 'value2');

console.log(table.get('key1')); // value1
console.log(table.get('key2')); // value2

table.remove('key1');

console.log(table.get('key1')); // undefined
console.log(table.get('key2')); // value2
