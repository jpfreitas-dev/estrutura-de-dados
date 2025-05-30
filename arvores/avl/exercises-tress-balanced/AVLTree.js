const Node = require('./TreeNode'); // Importa a classe de nó da árvore

class Tree {
    constructor() {
        this.root = null; // Inicializa a árvore com raiz nula
    }

    // Método público para inserir um valor na árvore
    insert(value) {
        this.root = this.#insert(this.root, value);
    }

    // Método público para buscar um valor na árvore
    search(value) {
        return this.#search(this.root, value);
    }

    // Método público para remover um valor da árvore
    remove(value) {
        this.root = this.#remove(this.root, value);
    }

    // Retorna os valores da árvore em pré-ordem
    getInPreOrder() {
        const result = [];
        this.#preOrder(this.root, result);
        return result;
    }

    // Retorna os valores da árvore em ordem
    getInOrder() {
        const result = [];
        this.#inOrder(this.root, result);
        return result;
    }

    // Retorna os valores da árvore em pós-ordem
    getInPostOrder() {
        const result = [];
        this.#postOrder(this.root, result);
        return result;
    }

    // Soma todos os valores da árvore
    sumValues() {
        const array = [];
        this.#sumValues(this.root, array);
        const soma = array.reduce((acc, current) => acc + current, 0);
        return soma;
    }

    // Verifica se dois valores estão na mesma subárvore (à esquerda ou à direita da raiz)
    isSameSubtree(a, b) {
        const vl = this.root.value;
        return a > vl && b > vl || a < vl && b < vl ? true : false;
    }

    // Retorna o valor do irmão de um nó com base no valor
    getSibling(value) {
        return this.#getSibling(this.root, value);
    }

    // MÉTODOS PRIVADOS

    // Retorna a altura do nó
    #getHeight(node) {
        return node ? node.height : 0;
    }

    // Calcula o fator de balanceamento de um nó (direita - esquerda)
    #getBalancefactor(node) {
        return node ? this.#getHeight(node.right) - this.#getHeight(node.left) : 0;
    }

    // Atualiza a altura do nó com base na altura dos filhos
    #updateHeight(node) {
        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
    }

    // Rotação simples à direita
    #rotateRight(y) {
        const x = y.left;
        const t = x.right;

        x.right = y;
        y.left = t;

        this.#updateHeight(y);
        this.#updateHeight(x);

        return x;
    }

    // Rotação simples à esquerda
    #rotateLeft(x) {
        const y = x.right;
        const t = y.left;

        y.left = x;
        x.right = t;

        this.#updateHeight(x);
        this.#updateHeight(y);

        return y;
    }

    // Inserção recursiva com balanceamento AVL
    #insert(node, value) {
        if (node === null) {
            return new Node(value); // Inserção inicial
        }

        if (value < node.value) {
            node.left = this.#insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.#insert(node.right, value);
        } else {
            return node; // Valores duplicados não são permitidos
        }

        // Atualiza altura e aplica rotações se necessário
        this.#updateHeight(node);
        const balance = this.#getBalancefactor(node);

        // Casos de rotação (balanceamento AVL)
        if (balance > 1 && value > node.right.value) {
            return this.#rotateLeft(node); // Direita Direita
        }
        if (balance < -1 && value < node.left.value) {
            return this.#rotateRight(node); // Esquerda Esquerda
        }
        if (balance > 1 && value < node.right.value) {
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node); // Direita Esquerda
        }
        if (balance < -1 && value > node.left.value) {
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node); // Esquerda Direita
        }

        return node;
    }

    // Busca recursiva
    #search(node, value) {
        if (node === null) return false;
        if (node.value === value) return true;

        if (value < node.value) {
            return this.#search(node.left, value);
        } else {
            return this.#search(node.right, value);
        }
    }

    // Remove valor da árvore com rebalanceamento
    #remove(node, value) {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this.#remove(node.left, value);
        } else if (value > node.value) {
            node.right = this.#remove(node.right, value);
        } else {
            // CASO 1: Nó folha
            if (node.left === null && node.right === null) {
                return null;
            }

            // CASO 2: Um filho
            if (node.right === null) return node.left;
            if (node.left === null) return node.right;

            // CASO 3: Dois filhos - substitui pelo sucessor
            const successor = this.#findSuccessor(node.right);
            node.value = successor;
            node.right = this.#remove(node.right, successor);
        }

        this.#updateHeight(node);
        const balance = this.#getBalancefactor(node);

        // Rebalanceamento após remoção
        if (balance > 1 && this.#getBalancefactor(node.right) <= 0) {
            return this.#rotateLeft(node);
        }
        if (balance > 1 && this.#getBalancefactor(node.right) > 0) {
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }
        if (balance < -1 && this.#getBalancefactor(node.left) >= 0) {
            return this.#rotateRight(node);
        }
        if (balance < -1 && this.#getBalancefactor(node.left) < 0) {
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        return node;
    }

    // Encontra o menor valor de uma subárvore (sucessor in-order)
    #findSuccessor(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    // Percurso pré-ordem
    #preOrder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this.#preOrder(node.left, result);
            this.#preOrder(node.right, result);
        }
    }

    // Percurso in-ordem
    #inOrder(node, result) {
        if (node !== null) {
            this.#inOrder(node.left, result);
            result.push(node.value);
            this.#inOrder(node.right, result);
        }
    }

    // Percurso pós-ordem
    #postOrder(node, result) {
        if (node !== null) {
            this.#postOrder(node.left, result);
            this.#postOrder(node.right, result);
            result.push(node.value);
        }
    }

    // Soma todos os valores da árvore (versão usando pré-ordem)
    #sumValues(node, array) {
        if (node !== null) {
            array.push(node.value);
            this.#sumValues(node.left, array); // Aqui você tinha usado this.#preOrder, mas o correto é this.#sumValues
            this.#sumValues(node.right, array);
        }
    }

    // Retorna o valor do irmão de um nó, se existir
    #getSibling(node, value) {
        if (node === null || value === null) return null;

        if (node.left && node.left.value === value) {
            return node.right ? node.right.value : null;
        }

        if (node.right && node.right.value === value) {
            return node.left ? node.left.value : null;
        }

        if (value < node.value) {
            return this.#getSibling(node.left, value);
        } else {
            return this.#getSibling(node.right, value);
        }
    }
}

module.exports = Tree;
