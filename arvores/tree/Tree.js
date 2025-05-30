const Node = require('./Node');

class Tree {
    constructor() {
        this.root = null; // Inicializa a raiz vazia
    }

    insert(value) {
        // Inserção pública: atualiza a raiz após inserir o valor recursivamente
        this.root = this.#insert(this.root, value);
    }

    search(value) {
        // Busca pública: retorna true se encontrar, false caso contrário
        return this.#search(this.root, value);
    }

    remove(value) {
        // Remoção pública: atualiza a raiz após remover o valor recursivamente
        this.root = this.#remove(this.root, value);
    }

    getInPreOrder() {
        // Retorna array dos valores em pré-ordem
        const result = [];
        this.#preOrder(this.root, result);
        return result;
    }

    getInOrder() {
        // Retorna array dos valores em ordem crescente (in-ordem)
        const result = [];
        this.#inOrder(this.root, result);
        return result;
    }

    getInPostOrder() {
        // Retorna array dos valores em pós-ordem
        const result = [];
        this.#postOrder(this.root, result);
        return result;
    }

    // Método privado recursivo para inserção em BST
    #insert(node, value) {
        if (node === null) {
            // Caso base: cria um novo nó se posição vazia
            return new Node(value);
        }

        if (value === node.value) {
            // Valor já existe, não insere duplicata
            return node;
        }

        if (value < node.value) {
            // Vai para o filho esquerdo
            node.left = this.#insert(node.left, value);
        } else {
            // Vai para o filho direito (valor maior)
            node.right = this.#insert(node.right, value);
        }

        return node; // Retorna o nó atualizado
    }

    // Busca recursiva na árvore
    #search(node, value) {
        if (node === null) return false; // Não encontrou

        if (node.value === value) return true; // Encontrou

        if (value < node.value) {
            return this.#search(node.left, value); // Busca esquerda
        } else {
            return this.#search(node.right, value); // Busca direita
        }
    }

    // Remoção recursiva na BST
    #remove(node, value) {
        if (node === null) return null; // Valor não encontrado

        if (value < node.value) {
            node.left = this.#remove(node.left, value);
            return node;
        }

        if (value > node.value) {
            node.right = this.#remove(node.right, value);
            return node;
        }

        // Encontrou o nó a remover

        // Caso 1: nó folha (sem filhos)
        if (node.left === null && node.right === null) {
            return null; // Remove simplesmente
        }

        // Caso 2: nó com apenas um filho
        if (node.right === null) return node.left; // Substitui pelo filho esquerdo
        if (node.left === null) return node.right; // Substitui pelo filho direito

        // Caso 3: nó com dois filhos
        // Substitui o valor pelo sucessor (menor valor na subárvore direita)
        const successor = this.#findSuccessor(node.right);
        node.value = successor;
        // Remove o sucessor que foi copiado para cá
        node.right = this.#remove(node.right, successor);

        return node; // **IMPORTANTE: Retorna o nó atualizado!**
    }

    // Encontra o menor valor da subárvore (sucessor)
    #findSuccessor(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    // Percurso pré-ordem (raiz, esquerda, direita)
    #preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.#preOrder(node.left, result);
            this.#preOrder(node.right, result);
        }
    }

    // Percurso in-ordem (esquerda, raiz, direita)
    #inOrder(node, result) {
        if (node !== null) {
            this.#inOrder(node.left, result);
            result.push(node.value);
            this.#inOrder(node.right, result);
        }
    }

    // Percurso pós-ordem (esquerda, direita, raiz)
    #postOrder(node, result) {
        if (node !== null) {
            this.#postOrder(node.left, result);
            this.#postOrder(node.right, result);
            result.push(node.value);
        }
    }
}

module.exports = Tree;
