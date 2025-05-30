const Node = require('./Node') // Importa a classe Node

// Classe para lista duplamente encadeada
class LinkedList {
    constructor(){
        this.head = null; // Primeiro nó da lista
        this.tail = null; // Último nó da lista
        this.size = 0;    // Quantidade de elementos na lista
    }

    // Adiciona elemento no começo da lista
    unshift(value) {
        const node = new Node(value);

        if(this.head === null){  // Se lista vazia, head e tail apontam para o novo nó
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head; // Novo nó aponta para o antigo head
            this.head.prev = node; // O antigo head aponta de volta para o novo nó (faltava isso no código original)
            this.head = node;      // Atualiza head para novo nó
        }

        this.size++;
    }

    // Adiciona elemento no final da lista
    push(value) {
        const node = new Node(value);
        
        if(this.tail === null){ // Se lista vazia, head e tail apontam para o novo nó
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node; // Antigo tail aponta para novo nó
            node.prev = this.tail; // Novo nó aponta para antigo tail
            this.tail = node;      // Atualiza tail para novo nó
        }

        this.size++;
    }

    // Insere valor em índice específico
    insertAtIndex(value, index){
        // Checa índice válido (de 0 até tamanho da lista)
        if(index < 0 || index > this.size){
            throw new Error('Index out of bounds');
        }

        if(index === 0){ 
            this.unshift(value); 
            return;  // Falta esse return, senão continua executando desnecessariamente
        }

        if(index === this.size){ 
            this.push(value); 
            return;
        }

        const node = new Node(value);
        let current = this.head;
        let i = 0;

        // Percorre até o nó do índice
        while(i < index){
            current = current.next;
            i++;
        }

        // Insere o novo nó antes do nó atual
        node.next = current;
        node.prev = current.prev;

        if(current.prev) {          // Corrigir caso current.prev seja null (quando index=0, mas esse caso é tratado acima)
            current.prev.next = node;
        }

        current.prev = node;

        this.size++;
    }

    // Imprime todos os valores da lista no console
    printAllElements(){
        if(this.size === 0) {
            console.log("Não há elementos");
            return;
        }
        let current = this.head;
        let all = " [ ";

        while(current != null) {
            all += current.value;
            if(current.next != null){
                all += ", ";
            }
            current = current.next;
        }

        all += " ] ";
        console.log(all);
    }

    // Remove e retorna o primeiro elemento da lista
    shift(){
        if(this.head === null) return null;

        const removedValue = this.head.value;
        this.head = this.head.next;

        if(this.head !== null) {
            this.head.prev = null;
        } else {
            this.tail = null; // Lista ficou vazia, atualiza tail
        }

        this.size--;
        return removedValue;
    }

    // Remove e retorna o último elemento da lista
    pop(){
        if(this.tail === null) return null;

        const removedValue = this.tail.value;
        this.tail = this.tail.prev;

        if(this.tail !== null) {
            this.tail.next = null;
        } else {
            this.head = null; // Lista ficou vazia, atualiza head
        }

        this.size--;
        return removedValue;
    }

    // Busca índice de um valor (O(n))
    findIndexByValue(value){
        let index = 0;
        let current = this.head;

        while(current !== null){
            if(current.value === value) return index;
            current = current.next;
            index++;
        }

        return -1; // Valor não encontrado
    }
    
    // Busca valor pelo índice (O(n))
    findValueByIndex(index){
        if(index < 0 || index >= this.size) return "Valor não encontrado";

        let idx = 0;
        let current = this.head;

        while(current !== null){
            if(idx === index) return current.value;
            current = current.next;
            idx++;
        }

        return "Valor não encontrado"; // Caso algo dê errado (não deveria chegar aqui)
    }

}

module.exports = LinkedList;
