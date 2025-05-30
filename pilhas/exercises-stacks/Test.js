const Stack = require('./Stack');
const stack = new Stack();

// Teste: isEmpty em uma pilha nova
console.log('Está vazia?', stack.isEmpty()); 
// Esperado: true

// Teste: peek em pilha vazia
console.log('Topo (peek):', stack.peek());
// Esperado: null

// Teste: push - adiciona elementos ao topo
stack.push(10);
stack.push(20);
stack.push(30);
stack.printAllElements();
// Esperado: [ 30, 20, 10 ]

// Teste: isEmpty depois de push
console.log('Está vazia?', stack.isEmpty()); 
// Esperado: false

// Teste: peek - ver elemento do topo
console.log('Topo (peek):', stack.peek());
// Esperado: 30

// Teste: pop - remove elemento do topo
const popped1 = stack.pop();
console.log('Removido:', popped1); 
// Esperado: 30
stack.printAllElements(); 
// Esperado: [ 20, 10 ]

// Teste: pop novamente
const popped2 = stack.pop();
console.log('Removido:', popped2); 
// Esperado: 20
stack.printAllElements(); 
// Esperado: [ 10 ]

// Teste: pop até esvaziar
stack.pop(); // remove 10
console.log('Topo (peek):', stack.peek()); 
// Esperado: null
stack.printAllElements(); 
// Esperado: Pilha vazia

// Teste: pop de pilha vazia
console.log('Removido de pilha vazia:', stack.pop());
// Esperado: null
