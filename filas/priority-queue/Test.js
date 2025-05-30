const PriorityQueue = require('./PriorityQueue');

const pq = new PriorityQueue();

pq.enqueue("Pedro", 3);
pq.enqueue("Érick", 1);
pq.enqueue("Tomaz", 2);

pq.dequeue();

pq.printQueue();
