const Node = require('./TreeNode'); // Importa a classe Node que representa os nós da árvore
const Queue = require('../../filas/queue/Queue') // Importa fila usada no método BFS (busca em largura)

class Tree {
    constructor(){
        this.root = null; // Inicializa a árvore vazia (sem raiz)
    }

    // Método público para inserir valor na árvore
    insert(value){
        this.root = this.#insert(this.root, value) // Insere o valor começando pela raiz (chamada recursiva)
    }

    // Método público para buscar valor na árvore, retorna true se encontrado, false caso contrário
    search(value){
        return this.#search(this.root, value);
    }

    // Método público para remover um valor da árvore
    remove(value){
        this.root = this.#remove(this.root, value);
    }

    // Retorna um array com os valores em pré-ordem (raiz, esquerda, direita)
    getInPreOrder(){
        const result = [];
        this.#preOrder(this.root, result);
        return result;
    }

    // Retorna um array com os valores em ordem (esquerda, raiz, direita)
    getInOrder(){
        const result = [];
        this.#inOrder(this.root, result);
        return result;
    }

    // Retorna um array com os valores em pós-ordem (esquerda, direita, raiz)
    getInPostOrder(){
        const result = [];
        this.#postOrder(this.root, result);
        return result;
    }

    // Retorna a altura de um nó, 0 se for null
    #getHeight(node){
        return node ? node.height : 0;
    }

    // Calcula o fator de balanceamento (altura do filho direito menos a altura do filho esquerdo)
    #getBalancefactor(node){
        return node ? this.#getHeight(node.right) - this.#getHeight(node.left) : 0;
    }

    // Atualiza a altura do nó com base na altura dos filhos
    #updateHeight(node){
        node.height = 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right))
    }

    // Rotação à direita (para balancear subárvore)
    #rotateRight(y){
        const x = y.left;
        const t = x.right;

        x.right = y;
        y.left = t;

        this.#updateHeight(y);
        this.#updateHeight(x);

        return x;
    }

    // Rotação à esquerda (para balancear subárvore)
    #rotateLeft(x){
        const y = x.right;
        const t = y.left;

        y.left = x;
        x.right = t;

        this.#updateHeight(x);
        this.#updateHeight(y);

        return y;
    }

    // Inserção recursiva na árvore AVL
    #insert(node, value){
        if(node === null){
            return new Node(value); // Cria novo nó quando chegar na posição correta
        }

        if(value < node.value){
            node.left = this.#insert(node.left, value); // Insere no filho esquerdo
        } else if (value > node.value){
            node.right = this.#insert(node.right, value); // Insere no filho direito
        } else {
            return node; // Valor já existe, não adiciona (não permite duplicatas)
        }

        this.#updateHeight(node); // Atualiza altura após inserção

        const balance = this.#getBalancefactor(node); // Calcula fator de balanceamento

        // Casos de desequilíbrio e as rotações para corrigir

        if(balance > 1 && value > node.right.value ){ // Right Right Case
            return this.#rotateLeft(node);
        }
        if(balance < -1 && value < node.left.value ){ // Left Left Case
            return this.#rotateRight(node);
        }
        if (balance > 1 && value < node.right.value){ // Right Left Case
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }
        if (balance < -1 && value > node.left.value){ // Left Right Case (corrigi o seu código que estava comparando com right.value errado)
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        return node; // Retorna o nó atualizado e balanceado
    }

    // Busca recursiva na árvore, retorna true se encontrar
    #search(node, value){
        if(node === null) return false;
        if(node.value === value) return true;

        if(value < node.value){
            return this.#search(node.left, value);
        } else {
            return this.#search(node.right, value);
        }
    }

    // Remoção recursiva na árvore AVL
    #remove(node, value){
        if(node === null) return null;

        if(value < node.value){
            node.left = this.#remove(node.left, value);
        } else if(value > node.value){
            node.right = this.#remove(node.right, value);
        } else {
            // Encontrou o nó a ser removido

            // Caso 1: nó folha
            if(node.left === null && node.right === null){
                return null;
            }

            // Caso 2: nó com um filho só
            if(node.right === null) return node.left;
            if(node.left === null) return node.right;

            // Caso 3: nó com dois filhos - encontra o sucessor (menor do lado direito)
            const successor = this.#findSuccessor(node.right);
            node.value = successor;
            node.right = this.#remove(node.right, successor);
        }

        this.#updateHeight(node);

        const balance = this.#getBalancefactor(node);

        // Balanceamento pós remoção (mesmos casos de rotação)

        if(balance > 1 && this.#getBalancefactor(node.right) <= 0){
            return this.#rotateLeft(node);
        }
        if(balance > 1 && this.#getBalancefactor(node.right) > 0){
            node.right = this.#rotateRight(node.right);
            return this.#rotateLeft(node);
        }
        if(balance < -1 && this.#getBalancefactor(node.left) >= 0){
            return this.#rotateRight(node);
        }
        if(balance < -1 && this.#getBalancefactor(node.left) < 0){
            node.left = this.#rotateLeft(node.left);
            return this.#rotateRight(node);
        }

        return node;
    }

    // Encontra o sucessor (menor nó da subárvore direita)
    #findSuccessor(node){
        while(node.left !== null){
            node = node.left;
        }
        return node.value;
    }

    // Percurso pré-ordem: raiz, esquerda, direita
    #preOrder(node, result){
        if(node !== null){
            result.push(node.value);
            this.#preOrder(node.left, result);
            this.#preOrder(node.right, result);
        }
    }

    // Percurso em ordem: esquerda, raiz, direita
    #inOrder(node, result){
        if(node !== null){
            this.#inOrder(node.left, result);
            result.push(node.value);
            this.#inOrder(node.right, result);
        }
    }

    // Percurso pós-ordem: esquerda, direita, raiz
    #postOrder(node, result){
        if(node !== null){
            this.#postOrder(node.left, result);
            this.#postOrder(node.right, result);
            result.push(node.value);
        }
    }

    // Busca em largura (BFS) usando fila
    bfs(){
        if(this.root === null) return;

        const queue = new Queue();
        queue.enqueue(this.root);

        let str = "BFS: [  ";
        while(queue.size > 0){
            const current = queue.dequeue();
            str += current.value + "   ";

            if(current.left !== null) queue.enqueue(current.left);
            if(current.right !== null) queue.enqueue(current.right);
        }
        str += "]";
        console.log(str);
    }
}

module.exports = Tree;
