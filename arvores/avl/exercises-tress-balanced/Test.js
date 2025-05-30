const Tree = require('./AVLTree');

// ----------------------
// Exercício 1: Somar valores da árvore
// ----------------------
const tree1 = new Tree();
[10, 20, 30, 40, 50, 25].forEach(v => tree1.insert(v));
console.log('Exercício 1 - Soma dos valores:', tree1.sumValues()); // Deve imprimir 175

// ----------------------
// Exercício 2: Verificar se dois valores estão na mesma subárvore
// ----------------------
const tree2 = new Tree();
[50, 30, 70, 20, 40, 60, 80].forEach(v => tree2.insert(v));
console.log('Exercício 2 - Mesma subárvore?');
console.log('20 e 40:', tree2.isSameSubtree(20, 40)); // true (ambos na esquerda)
console.log('20 e 60:', tree2.isSameSubtree(20, 60)); // false (um na esquerda, outro na direita)
console.log('100 e 20:', tree2.isSameSubtree(100, 20)); // false (100 não está na árvore)

// ----------------------
// Exercício 3: Buscar irmão de um nó
// ----------------------
const tree3 = new Tree();
[50, 30, 70, 20, 40, 60, 80].forEach(v => tree3.insert(v));
console.log('Exercício 3 - Irmãos de nós:');
console.log('Irmão de 30:', tree3.getSibling(30)); // 70
console.log('Irmão de 20:', tree3.getSibling(20)); // 40
console.log('Irmão de 50:', tree3.getSibling(50)); // null (raiz não tem irmão)
console.log('Irmão de 100:', tree3.getSibling(100)); // null (nó não existe)
