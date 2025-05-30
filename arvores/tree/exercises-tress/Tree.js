const Node = require('./Node');

class Tree {
    constructor() {
        this.root = null; // raiz da árvore inicialmente vazia
    }

    insert(value) {
        // chama função recursiva privada para inserir valor na árvore, a partir da raiz
        this.root = this.#insert(this.root, value);
    }

    search(value) {
        // verifica se um valor está na árvore, a partir da raiz
        return this.#search(this.root, value);
    }

    remove(value) {
        // remove um nó da árvore com o valor indicado
        this.root = this.#remove(this.root, value);
    }

    getInPreOrder() {
        // retorna array com valores em pré-ordem (raiz, esquerda, direita)
        const result = [];
        this.#preOrder(this.root, result);
        return result;
    }

    getInOrder() {
        // retorna array com valores em ordem crescente (esquerda, raiz, direita)
        const result = [];
        this.#inOrder(this.root, result);
        return result;
    }

    getInPostOrder() {
        // retorna array com valores em pós-ordem (esquerda, direita, raiz)
        const result = [];
        this.#postOrder(this.root, result);
        return result;
    }

    getMinMax() {
        // busca os valores mínimo e máximo da árvore
        // método ineficiente: faz um percurso em ordem, guarda todos os valores, depois usa Math.min e Math.max
        // para árvores grandes, isso é pesado em memória e tempo
        const result = [];
        this.#inOrder(this.root, result);

        const min = Math.min(...result);
        const max = Math.max(...result);

        return (`Menor valor: ${min}\nMaior valor: ${max}`);
    }

    countNodes() {
        // retorna quantidade total de nós da árvore
        const count = this.#countNodes(this.root);
        return (`Essa árvore tem ${count} nós`);
    }

    countLeaves() {
        // retorna quantidade total de nós folhas (sem filhos)
        const count = this.#countLeaves(this.root);
        return `Essa árvore tem ${count} nós folhas`;
    }

    mirror() {
        // inverte a árvore, trocando filhos esquerdo e direito recursivamente
        this.#mirror(this.root);
    }

    // ******** Métodos privados ******** //

    #insert(node, value) {
        if (node === null) {
            // se nó vazio, cria um novo nó com o valor (base da recursão)
            return new Node(value);
        }

        if (value < node.value) {
            // insere recursivamente na subárvore esquerda
            node.left = this.#insert(node.left, value);
        } else {
            // se valor >= nó atual, insere na subárvore direita
            node.right = this.#insert(node.right, value);
        }

        return node; // retorna nó atualizado para ligação com pai
    }

    #search(node, value) {
        if (node === null) return false; // não achou

        if (node.value === value) return true; // achou

        if (value < node.value) {
            // busca na subárvore esquerda
            return this.#search(node.left, value);
        } else {
            // busca na subárvore direita
            return this.#search(node.right, value);
        }
    }

    #remove(node, value) {
        if (node === null) return null; // nó não existe

        if (value < node.value) {
            // procura na esquerda
            node.left = this.#remove(node.left, value);
            return node;
        }

        if (value > node.value) {
            // procura na direita
            node.right = this.#remove(node.right, value);
            return node;
        }

        // Achou o nó que quer remover

        // Caso 1: nó folha (sem filhos)
        if (node.left === null && node.right === null) {
            return null; // simplesmente remove
        }

        // Caso 2: nó com apenas um filho
        if (node.right === null) return node.left;
        if (node.left === null) return node.right;

        // Caso 3: nó com dois filhos
        // Para remover, substitui pelo sucessor (menor valor da subárvore direita)
        const successor = this.#findSuccessor(node.right);
        node.value = successor;
        node.right = this.#remove(node.right, successor);

        return node; // importante: aqui faltava retornar node depois do terceiro caso, senão pode dar undefined
    }

    #findSuccessor(node) {
        // encontra o menor valor a partir de um nó (sempre subárvore esquerda)
        while (node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    #preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.#preOrder(node.left, result);
            this.#preOrder(node.right, result);
        }
    }

    #inOrder(node, result) {
        if (node !== null) {
            this.#inOrder(node.left, result);
            result.push(node.value);
            this.#inOrder(node.right, result);
        }
    }

    #postOrder(node, result) {
        if (node !== null) {
            this.#postOrder(node.left, result);
            this.#postOrder(node.right, result);
            result.push(node.value);
        }
    }

    #countNodes(node) {
        if (node === null) return 0;
        return 1 + this.#countNodes(node.left) + this.#countNodes(node.right);
    }

    #countLeaves(node) {
        if (node === null) return 0;

        if (node.left === null && node.right === null) {
            // se não tem filhos, é folha
            return 1;
        }

        // soma folhas das subárvores esquerda e direita
        return this.#countLeaves(node.left) + this.#countLeaves(node.right);
    }

    #mirror(node) {
        if (node !== null) {
            // troca os filhos esquerdo e direito
            let temp = node.left;
            node.left = node.right;
            node.right = temp;

            // espelha recursivamente os filhos
            this.#mirror(node.left);
            this.#mirror(node.right);
        }
    }
}

module.exports = Tree;
