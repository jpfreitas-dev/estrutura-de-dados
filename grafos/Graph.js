const Node = require('./Node');
const Queue = require('../filas/queue/Queue');
const Stack = require('../pilhas/Stack');

class Graph {
    constructor() {
        this.adjacencyMatrix = []; // Matriz de adjacência: array 2D para armazenar conexões
        this.nodes = []; // Lista de nós (objetos Node)
    }

    // Retorna o grau do nó (quantas arestas ele tem)
    getDegree(nodeIndex) {
        let edges = 0;
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            if (this.adjacencyMatrix[nodeIndex][i] === 1) {
                edges++;
            }
        }
        return edges;
    }

    // Verifica se há uma aresta entre nodeIndex1 e nodeIndex2
    isConnected(nodeIndex1, nodeIndex2) {
        if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return false;
        return this.adjacencyMatrix[nodeIndex1][nodeIndex2] === 1;
    }

    // Retorna array de índices dos nós que não possuem nenhuma aresta (grau 0)
    getIsolatedNodes() {
        let isolate = [];
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            if (this.getDegree(i) === 0) {
                isolate.push(i);
            }
        }
        return isolate;
    }

    // Adiciona um novo nó ao grafo
    addNode(value) {
        const node = new Node(value);
        this.nodes.push(node);

        // Adiciona uma nova linha na matriz com zeros (tamanho igual ao número total de nós)
        this.adjacencyMatrix.push(new Array(this.nodes.length).fill(0));

        // Adiciona uma nova coluna com 0 para as linhas já existentes, mantendo a matriz quadrada
        for (let i = 0; i < this.adjacencyMatrix.length - 1; i++) {
            this.adjacencyMatrix[i].push(0);
        }
    }

    // Adiciona uma aresta entre dois nós (grafo não direcionado)
    addEdge(nodeIndex1, nodeIndex2) {
        if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return;

        this.adjacencyMatrix[nodeIndex1][nodeIndex2] = 1;
        this.adjacencyMatrix[nodeIndex2][nodeIndex1] = 1;
    }

    // Remove uma aresta entre dois nós
    removeEdge(nodeIndex1, nodeIndex2) {
        if (!this.#isValidNode(nodeIndex1) || !this.#isValidNode(nodeIndex2)) return;

        this.adjacencyMatrix[nodeIndex1][nodeIndex2] = 0;
        this.adjacencyMatrix[nodeIndex2][nodeIndex1] = 0;
    }

    // Remove um nó e todas as suas arestas da matriz e da lista de nós
    removeNode(nodeIndex) {
        if (!this.#isValidNode(nodeIndex)) return;

        this.nodes.splice(nodeIndex, 1); // Remove nó da lista

        this.adjacencyMatrix.splice(nodeIndex, 1); // Remove linha da matriz

        // Remove a coluna referente ao nó removido em todas as linhas restantes
        // CORREÇÃO AQUI: o loop deve ir até this.adjacencyMatrix.length, sem -1
        for (let i = 0; i < this.adjacencyMatrix.length; i++) {
            this.adjacencyMatrix[i].splice(nodeIndex, 1);
        }
    }

    // Método privado para validar índice de nó
    #isValidNode(index) {
        return index >= 0 && index < this.nodes.length;
    }

    // Imprime o grafo: nós e matriz de adjacência
    print() {
        console.log("Nós: " + this.nodes.map((node) => node.value));
        console.log("Matriz de Adjacência:");
        for (const row of this.adjacencyMatrix) {
            console.log(row.join("   "));
        }
    }

    // Busca em largura (BFS) a partir de um nó inicial
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

            // Enfileira os vizinhos não visitados
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

    // Busca em profundidade (DFS) a partir de um nó inicial
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

                // Empilha os vizinhos em ordem reversa para manter a ordem correta da DFS
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

    // Retorna todas as rotas possíveis entre start e end usando DFS recursiva
    findAllPaths(start, end) {
        if (!this.#isValidNode(start) || !this.#isValidNode(end)) return [];

        const paths = [];
        const visited = new Array(this.nodes.length).fill(false);
        this.#dfsFindPaths(start, end, [], visited, paths);
        return paths;
    }

    // Função auxiliar privada para findAllPaths
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
}

module.exports = Graph;
