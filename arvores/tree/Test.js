const Tree = require('./Tree');

const tree = new Tree();

tree.insert(5);
tree.insert(4);
tree.insert(3);
tree.insert(2);
tree.insert(1);

console.log(tree.getInOrder())

