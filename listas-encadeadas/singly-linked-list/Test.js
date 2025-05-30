const LinkedList = require('./LinkedList');
const list = new LinkedList();

// Teste: unshift - adicionar no começo
list.unshift(10);
list.unshift(20);
list.unshift(30);
list.printAllElements(); 
// Esperado: [ 30, 20, 10 ]

// Teste: push - adicionar no fim
list.push(40);
list.push(50);
list.printAllElements();
// Esperado: [ 30, 20, 10, 40, 50 ]

// Teste: insertAtIndex - inserir no meio
list.insertAtIndex(25, 2);
list.printAllElements();
// Esperado: [ 30, 20, 25, 10, 40, 50 ]

// Teste: shift - remove o primeiro elemento
const shifted = list.shift();
console.log('shifted:', shifted); // Esperado: shifted: 30
list.printAllElements();
// Esperado: [ 20, 25, 10, 40, 50 ]

// Teste: pop - remove o último elemento
const popped = list.pop();
console.log('popped:', popped); // Esperado: popped: 50
list.printAllElements();
// Esperado: [ 20, 25, 10, 40 ]

// Teste: findIndexByValue - encontrar índice pelo valor
console.log('Index of 25:', list.findIndexByValue(25)); // Esperado: Index of 25: 1
console.log('Index of 100:', list.findIndexByValue(100)); // Esperado: Index of 100: -1

// Teste: findValueByIndex - encontrar valor pelo índice
console.log('Value at index 2:', list.findValueByIndex(2)); // Esperado: Value at index 2: 10
try {
  console.log(list.findValueByIndex(10)); // Deve lançar erro
} catch(e) {
  console.log('Erro:', e.message); // Esperado: Erro: Out of Bounds
}
