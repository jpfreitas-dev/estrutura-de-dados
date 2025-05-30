const Graph = require('./Graph');
const graph = new Graph();

// graph.addNode("A"); // 0
// graph.addNode("B"); // 1
// graph.addNode("C"); // 2
// graph.addNode("D"); // 3

// graph.addEdge(0, 1);
// graph.addEdge(0, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 3);

// console.log(graph.findAllPaths(0, 3));
// // Deve imprimir: [ [ 'A', 'B', 'D' ], [ 'A', 'C', 'D' ] ]

graph.addNode("s"); //0
graph.addNode("t"); //1
graph.addNode("y"); //2
graph.addNode("x"); //3
graph.addNode("z"); //4

graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 2);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 2);
graph.addEdge(1, 4, 3);
graph.addEdge(2, 1, 1);
graph.addEdge(2, 4, 5);
graph.addEdge(4, 3, 1);

graph.getShortestPath(0)

