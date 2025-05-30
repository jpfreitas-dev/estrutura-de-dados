const Node = require('./Node');

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Adiciona elemento no final da fila
  enqueue(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // Remove e retorna o elemento do início da fila, ou null se vazia
  dequeue() {
    if (this.head === null) return null;

    const removed = this.head.value;
    this.head = this.head.next;
    this.size--;

    if (this.size === 0) this.tail = null;

    return removed;
  }

  // Retorna o valor do primeiro elemento, ou null se fila vazia
  front() {
    return this.head ? this.head.value : null;
  }

  // Imprime os elementos da fila na ordem em que serão removidos
  printQueue() {
    if (this.head === null) {
      console.log("Não há elementos");
      return;
    }

    let current = this.head;
    let str = "[ ";
    while (current) {
      str += current.value;
      if (current.next !== null) str += ", ";
      current = current.next;
    }
    str += " ]";
    console.log(str);
  }
}

module.exports = Queue;
