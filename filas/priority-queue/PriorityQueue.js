const Node = require('./Node');

class PriorityQueue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Insere elemento na fila respeitando a prioridade (menor valor = maior prioridade)
    enqueue(value, priority){
        const node = new Node(value, priority);
        
        if (!this.head || priority < this.head.priority){
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            while (current.next && current.next.priority <= priority){
                current = current.next;
            }
            node.next = current.next;
            current.next = node ;
        }
        this.size++
    }

    // Remove e retorna o elemento com maior prioridade (início da fila)
    // Lança erro se fila vazia
    dequeue(value){ 
        if(!this.head) {
            throw new Error("A fila está vazia!");
        }
        
        const removed = this.head.value;
        this.head = this.head.next;
        this.size--;

        if(this.size === 0) return this.tail = null;

        return removed; // retornamos o valor removido
    }

    // Retorna true se a fila estiver vazia
    isEmpty(){
        return this.head === null;
    }

    // Imprime os elementos da fila em ordem de prioridade
    printQueue(){
        if(this.head === null){
            console.log("Não há elementos");
            return;
        }

        let current = this.head;
        let str = "[ ";
        while(current){
            str += current.value;
            if(current.next !== null){
                str += ", "
            }
            current = current.next;
        }
        str += " ]";
        console.log(str)
    }
} 

module.exports = PriorityQueue;