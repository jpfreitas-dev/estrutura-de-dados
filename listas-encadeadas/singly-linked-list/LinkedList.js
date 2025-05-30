const Node = require('./Node')

class LinkedList {
    constructor(){
        this.head = null;  // início da lista
        this.tail = null;  // fim da lista
        this.size = 0;     // controle do tamanho da lista
    }

    // O(1) - insere no começo da lista
    unshift(value){ 
        const node = new Node(value);

        if(this.head === null){  // lista vazia
            this.head = node;    // head aponta para novo nó
            this.tail = node;    // tail aponta para novo nó
        } else {                 // lista com elementos
            node.next = this.head; // novo nó aponta para antigo primeiro
            this.head = node;      // head atualiza para novo nó
        }

        this.size++; // incrementa tamanho da lista
    }

    // O(1) - insere no final da lista
    push(value){ 
        const node = new Node(value);
        if(this.tail === null){  // lista vazia
            this.head = node;
            this.tail = node;
        } else { 
            this.tail.next = node;  // antigo último aponta para novo
            this.tail = node;       // tail atualiza para novo nó
        } 
        
        this.size++; // incrementa tamanho
    }

    // O(n) - insere em índice específico
    insertAtIndex(value, index){ 
        if(index < 0 || index > this.size){ // índice inválido
            throw new Error('Index out of bounds');
        }

        if(index === 0){ // insere no começo
            this.unshift(value);
            return;
        }

        if(index === this.size){ // insere no fim
            this.push(value);
            return;
        }

        let node = new Node(value);
        let current = this.head;
        let previous = null;
        let i = 0;

        while(i < index){ // percorre até posição alvo
            previous = current;
            current = current.next;
            i++;
        }

        node.next = current;    // novo nó aponta para o nó atual (posição do índice)
        previous.next = node;   // nó anterior aponta para novo nó
        this.size++;            // incrementa tamanho
    }

    // O(n) - imprime todos os elementos da lista
    printAllElements(){ 
        if(this.size === 0) {
            console.log("Não há elementos");
            return;
        }
        let current = this.head;
        let all = " [ ";
        while(current != null){ // enquanto existir nó
            all += current.value;
            if(current.next != null){
                all += ", ";
            }
            current = current.next;
        }
        all += " ] ";
        console.log(all)
    }

    // O(1) - remove o primeiro elemento e retorna o valor
    shift(){
        if(this.head === null) return null; // lista vazia

        const removedValue = this.head.value; // salva valor removido
        this.head = this.head.next;           // head aponta para próximo nó
        this.size--;

        if(this.size === 0){   // se lista ficou vazia
            this.tail = null;  // tail também zera
        }
        return removedValue;
    }
    
    // O(n) - remove o último elemento e retorna o valor
    pop(){
        if(this.head === null) return null; // lista vazia

        if(this.head === this.tail){ // lista com 1 elemento só
            const val = this.head.value;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return val;
        }

        let current = this.head;
        let previous = null;
        while(current.next !== null){ // percorre até o penúltimo nó
            previous = current;
            current = current.next;
        }

        const val = current.value;  // valor removido (último)
        previous.next = null;       // penúltimo nó vira o último
        this.tail = previous;
        this.size--;
        return val;
    }

    // O(n) - encontra índice pelo valor
    findIndexByValue(value){
        let index = 0;
        let current = this.head;
        while(current !== null){
            if(current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1; // não encontrado
    }

    // O(n) - encontra valor pelo índice
    findValueByIndex(index){
        if(index >= this.size) throw new Error('Out of Bounds');
        let idx = 0;
        let current = this.head;
        while(idx < this.size){
            if(idx === index) return current.value;
            current = current.next;
            idx++;
        }
        return "Valor não encontrado"; // só ocorre se lista for inconsistente
    }
}

module.exports = LinkedList;
