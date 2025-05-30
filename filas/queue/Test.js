const Queue = require('./Queue');

const queue = new Queue();

queue.enqueue("Pedro");
queue.enqueue("Érick");
queue.enqueue("Tomaz");

queue.dequeue();

queue.printQueue();
