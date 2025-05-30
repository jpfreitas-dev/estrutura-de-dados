const Stack = require('./Stack');

let stack = new Stack();

// Inserindo livros na pilha
stack.push("Tomando decisões Segundo a Vontade de Deus");
stack.push("A Conquista Da Terra Prometida");
stack.push("A Bíblia Sagrada");

// Deve imprimir: [ A Bíblia Sagrada, A Conquista Da Terra Prometida, Tomando decisões Segundo a Vontade de Deus ]
stack.printAllElements(); 

// Removendo o topo da pilha (A Bíblia Sagrada)
stack.pop();

// Deve imprimir: [ A Conquista Da Terra Prometida, Tomando decisões Segundo a Vontade de Deus ]
stack.printAllElements();

// Deve imprimir: A Conquista Da Terra Prometida
console.log(stack.peek()); 
