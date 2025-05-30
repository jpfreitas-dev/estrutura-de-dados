const Tree = require('./AVLTree');
const tree = new Tree();


tree.insert(9);
tree.insert(8);
tree.insert(7);
tree.insert(6);
tree.insert(10);
tree.insert(11);

tree.bfs();

console.log(tree.getInPreOrder()) // Já é um Dfs


