const Graph = require('./Graph');
const graph = new Graph();

// --- Adicionar nós ---
graph.addNode("A"); // 0
graph.addNode("B"); // 1
graph.addNode("C"); // 2
graph.addNode("D"); // 3
graph.addNode("E"); // 4 (isolado)

// --- Adicionar arestas ---
graph.addEdge(0, 1); // A-B
graph.addEdge(0, 2); // A-C
graph.addEdge(1, 3); // B-D
graph.addEdge(2, 3); // C-D

// --- Imprimir grafo ---
console.log("=== GRAFO ===");
graph.print();
/*
Nós: A,B,C,D,E
Matriz de Adjacência:
0 1 1 0 0
1 0 0 1 0
1 0 0 1 0
0 1 1 0 0
0 0 0 0 0
*/

// --- Grau dos nós ---
console.log("Grau do nó A (0):", graph.getDegree(0)); // Esperado: 2
console.log("Grau do nó E (4):", graph.getDegree(4)); // Esperado: 0

// --- Verificar conexões ---
console.log("A está conectado a B?", graph.isConnected(0, 1)); // Esperado: true
console.log("A está conectado a D?", graph.isConnected(0, 3)); // Esperado: false

// --- Nós isolados ---
console.log("Nós isolados:", graph.getIsolatedNodes()); // Esperado: [4]

// --- BFS a partir de A (0) ---
graph.bfs(0);
// Esperado: BFS: [ A   B   C   D ]

// --- DFS a partir de A (0) ---
graph.dfs(0);
// Esperado: DFS: [ A   B   D   C ]

// --- Todos os caminhos de A (0) até D (3) ---
const paths = graph.findAllPaths(0, 3);
console.log("Caminhos de A até D:", paths);
// Esperado: [ [ 'A', 'B', 'D' ], [ 'A', 'C', 'D' ] ]

// --- Remover aresta A-B ---
graph.removeEdge(0, 1);
console.log("A está conectado a B depois da remoção da aresta?", graph.isConnected(0, 1)); // Esperado: false

// --- Remover nó B (índice 1) ---
graph.removeNode(1);

console.log("\nGrafo após remover nó B:");
graph.print();
/*
Nós: A,C,D,E
Matriz de Adjacência:
0 1 0 0
1 0 1 0
0 1 0 0
0 0 0 0
*/

// --- BFS após remoção do nó B ---
graph.bfs(0);
// Esperado: BFS: [ A   C   D ]
