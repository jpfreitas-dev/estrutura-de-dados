const Node = require('./Node');

class Stack {
    constructor() {
        this.top = null;  // Referência para o topo da pilha
        this.size = 0;    // Quantidade de elementos na pilha
    }

    /**
     * Adiciona um novo valor ao topo da pilha.
     * Complexidade: O(1)
     */
    push(value) {
        const node = new Node(value);
        node.next = this.top;
        this.top = node;
        this.size++;
    }

    /**
     * Remove e retorna o valor no topo da pilha.
     * Retorna null se a pilha estiver vazia.
     * Complexidade: O(1)
     */
    pop() {
        if (this.top === null) return null;

        const popped = this.top.value;
        this.top = this.top.next;
        this.size--;
        return popped;
    }

    /**
     * Retorna o valor no topo da pilha sem removê-lo.
     * Retorna null se a pilha estiver vazia.
     * Complexidade: O(1)
     */
    peek() {
        return this.top ? this.top.value : null;
    }

    /**
     * Retorna true se a pilha estiver vazia; false caso contrário.
     * Complexidade: O(1)
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Imprime todos os elementos da pilha, do topo até a base.
     * Complexidade: O(n)
     */
    printAllElements() {
        if (this.isEmpty()) {
            console.log("Pilha vazia");
            return;
        }

        let current = this.top;
        let str = "[ ";
        while (current) {
            str += current.value;
            if (current.next !== null) {
                str += ", ";
            }
            current = current.next;
        }
        str += " ]";
        console.log(str);
    }
}

module.exports = Stack;
