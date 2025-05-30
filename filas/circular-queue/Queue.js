const Node = require('./Node');

class Queue {
  constructor() {
    this.head = null; // início da fila
    this.tail = null; // fim da fila
    this.size = 0;
  }

  // Adiciona um elemento ao final da fila
  // Mantém a fila circular apontando tail.next para head
  enqueue(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    // fecha o ciclo da fila circular
    this.tail.next = this.head;
    this.size++;
  }

  // Remove o primeiro elemento da fila e retorna seu valor
  // Atualiza o tail.next para manter o ciclo, e reseta tail se fila esvaziar
  dequeue() {
    if (this.head === null) return null;

    const removed = this.head.value;
    this.head = this.head.next;
    this.tail.next = this.head;
    this.size--;

    if (this.size === 0) {
      this.tail = null;
    }

    return removed;
  }

  // Retorna o valor do primeiro elemento, ou null se vazia
  front() {
    return this.head ? this.head.value : null;
  }

  // Imprime os elementos da fila circular
  // Usa do-while porque é circular e precisa garantir que o head seja mostrado
  printQueue() {
    if (this.head === null) {
      console.log("Não há elementos");
      return;
    }

    let current = this.head;
    let str = "[ ";

    do {
      str += current.value + " -> " + current.next.value;
      if (current !== this.tail) str += ", ";
      current = current.next;
    } while (current !== this.head);

    str += " ]";
    console.log(str);
  }
}

module.exports = Queue;
