const LinkedList = require('./LinkedList');

const list = new LinkedList();

console.log('### Teste: Inserção no começo (unshift)');
list.unshift(10);
list.unshift(20);
list.unshift(30);
// Lista esperada: [ 30, 20, 10 ]
list.printAllElements(); // Deve imprimir: [ 30, 20, 10 ]

console.log('\n### Teste: Inserção no final (push)');
list.push(40);
list.push(50);
// Lista esperada: [ 30, 20, 10, 40, 50 ]
list.printAllElements(); // Deve imprimir: [ 30, 20, 10, 40, 50 ]

console.log('\n### Teste: Inserção em índice específico (insertAtIndex)');
list.insertAtIndex(25, 2); // Insere 25 no índice 2
// Lista esperada: [ 30, 20, 25, 10, 40, 50 ]
list.printAllElements(); // Deve imprimir: [ 30, 20, 25, 10, 40, 50 ]

console.log('\n### Teste: Remoção do primeiro elemento (shift)');
const shifted = list.shift(); 
console.log('Removido:', shifted); // Deve imprimir: Removido: 30
// Lista esperada: [ 20, 25, 10, 40, 50 ]
list.printAllElements();

console.log('\n### Teste: Remoção do último elemento (pop)');
const popped = list.pop();
console.log('Removido:', popped); // Deve imprimir: Removido: 50
// Lista esperada: [ 20, 25, 10, 40 ]
list.printAllElements();

console.log('\n### Teste: Buscar índice pelo valor (findIndexByValue)');
console.log('Índice do valor 10:', list.findIndexByValue(10)); // Deve imprimir: 2
console.log('Índice do valor 100:', list.findIndexByValue(100)); // Deve imprimir: -1 (não encontrado)

console.log('\n### Teste: Buscar valor pelo índice (findValueByIndex)');
console.log('Valor no índice 3:', list.findValueByIndex(3)); // Deve imprimir: 40
console.log('Valor no índice 10:', list.findValueByIndex(10)); // Deve imprimir: Valor não encontrado
