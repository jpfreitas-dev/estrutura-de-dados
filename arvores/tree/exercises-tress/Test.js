const Tree = require('./Tree');

const tree = new Tree();

tree.insert(4);
tree.insert(2);
tree.insert(1);
tree.insert(3);
tree.insert(7);
tree.insert(6);
tree.insert(9);


console.log(tree.getInPreOrder());
tree.mirror()
console.log(tree.getInPreOrder())



