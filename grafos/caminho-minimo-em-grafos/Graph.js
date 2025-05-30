const Node = require('./Node');
const Queue = require('../../filas/queue/Queue');
const Stack = require('../../pilhas/Stack');
const PriorityQueue = require('../../filas/priority-queue/PriorityQueue');

class Graph {
  constructor() {
    this.adjacencyMatrix = [];
    this.nodes = [];
  }

  // Retorna o grau (número de arestas) do nó pelo índice
  getDegree(nodeIndex) {
    let edges = 0;
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      if (this.adjacencyMatrix[nodeIndex][i] === 1) edges++;
    }
    return edges;
  }

  // Verifica se existe aresta entre dois nós
  isConnected(nodeIndex1, nodeIndex2) {
    if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return false;
    return this.adjacencyMatrix[nodeIndex1][nodeIndex2] === 1;
  }

  // Retorna array com índices dos nós isolados (sem arestas)
  getIsolatedNodes() {
    const isolate = [];
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      if (this.getDegree(i) === 0) isolate.push(i);
    }
    return isolate;
  }

  // Adiciona um nó novo e ajusta matriz de adjacência (linhas e colunas)
  addNode(value) {
    const node = new Node(value);
    this.nodes.push(node);

    this.adjacencyMatrix.push(new Array(this.nodes.length).fill(0)); // nova linha
    for (let i = 0; i < this.adjacencyMatrix.length - 1; i++) {
      this.adjacencyMatrix[i].push(0); // adiciona coluna
    }
  }

  // Adiciona uma aresta direcionada com peso (default 1)
  addEdge(nodeIndex1, nodeIndex2, weight = 1) {
    if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return;
    this.adjacencyMatrix[nodeIndex1][nodeIndex2] = weight;
    // Se grafo fosse não-direcionado, adicionar a matriz[nodeIndex2][nodeIndex1] também
  }

  // Remove aresta entre dois nós
  removeEdge(nodeIndex1, nodeIndex2) {
    if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return;
    this.adjacencyMatrix[nodeIndex1][nodeIndex2] = 0;
  }

  // Remove nó e ajusta matriz removendo linha e coluna correspondente
  removeNode(nodeIndex) {
    if (!this.#isValidNode(nodeIndex)) return;
    this.nodes.splice(nodeIndex, 1);
    this.adjacencyMatrix.splice(nodeIndex, 1);
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      this.adjacencyMatrix[i].splice(nodeIndex, 1);
    }
  }

  // Valida se o índice é nó existente
  #isValidNode(index) {
    return index >= 0 && index < this.nodes.length;
  }

  // Exibe nós e matriz no console
  print() {
    console.log("Nós: " + this.nodes.map(node => node.value));
    console.log("Matriz de Adjacência:");
    for (const row of this.adjacencyMatrix) {
      console.log(row.join("   "));
    }
  }

  // Busca em largura a partir de um nó, imprimindo ordem de visita
  bfs(startVertex) {
    if (!this.#isValidNode(startVertex)) return;

    const queue = new Queue();
    const visited = new Array(this.nodes.length).fill(false);

    queue.enqueue(startVertex);
    visited[startVertex] = true;

    let str = "BFS: [ ";
    while (queue.size > 0) {
      const current = queue.dequeue();
      str += this.nodes[current].value + "   ";

      for (let i = 0; i < this.adjacencyMatrix[current].length; i++) {
        if (this.adjacencyMatrix[current][i] === 1 && !visited[i]) {
          visited[i] = true;
          queue.enqueue(i);
        }
      }
    }
    str += "]";
    console.log(str);
  }

  // Busca em profundidade iterativa usando pilha, imprimindo ordem de visita
  dfs(startVertex) {
    if (!this.#isValidNode(startVertex)) return;

    const stack = new Stack();
    const visited = new Array(this.nodes.length).fill(false);

    stack.push(startVertex);

    let str = "DFS: [ ";
    while (!stack.isEmpty()) {
      const current = stack.pop();

      if (!visited[current]) {
        visited[current] = true;
        str += this.nodes[current].value + "   ";

        // Empilha os vizinhos em ordem reversa para garantir ordem correta de visita
        for (let i = this.adjacencyMatrix[current].length - 1; i >= 0; i--) {
          if (this.adjacencyMatrix[current][i] === 1 && !visited[i]) {
            stack.push(i);
          }
        }
      }
    }
    str += "]";
    console.log(str);
  }

  // Retorna todas as possíveis rotas entre dois nós (recursivo)
  findAllPaths(start, end) {
    const paths = [];
    const visited = new Array(this.nodes.length).fill(false);
    this.#dfsFindPaths(start, end, [], visited, paths);
    return paths;
  }

  // Função auxiliar para findAllPaths (DFS recursivo)
  #dfsFindPaths(current, end, path, visited, paths) {
    visited[current] = true;
    path.push(this.nodes[current].value);

    if (current === end) {
      paths.push([...path]);
    } else {
      for (let i = 0; i < this.adjacencyMatrix[current].length; i++) {
        if (this.adjacencyMatrix[current][i] === 1 && !visited[i]) {
          this.#dfsFindPaths(i, end, path, visited, paths);
        }
      }
    }

    path.pop();
    visited[current] = false;
  }

  // Encontra menores distâncias do nó inicial para todos os outros (Dijkstra simplificado)
  getShortestPath(startVertex) {
    if (!this.#isValidNode(startVertex)) return;

    const distances = new Array(this.nodes.length).fill(Infinity);
    const visited = new Array(this.nodes.length).fill(false);
    const queue = new PriorityQueue();

    distances[startVertex] = 0;
    queue.enqueue(startVertex, 0);

    while (!queue.isEmpty()) {
      const currentVertex = queue.dequeue();

      if (visited[currentVertex]) continue;
      visited[currentVertex] = true;

      for (let neighbor = 0; neighbor < this.adjacencyMatrix.length; neighbor++) {
        const weight = this.adjacencyMatrix[currentVertex][neighbor];
        if (weight > 0 && !visited[neighbor]) {
          const newDistance = distances[currentVertex] + weight;
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            queue.enqueue(neighbor, newDistance);
          }
        }
      }
    }

    console.log(`Distâncias mínimas a partir do nó ${this.nodes[startVertex].value}: ${distances}`);
    return distances;
  }
}

module.exports = Graph;
