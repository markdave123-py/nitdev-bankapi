
// interface IStack<T> {
//   push(item: T): void;
//   pop(): T | undefined;
//   peek(): T | undefined;
//   size(): number;
// }

// class Stack<T> implements IStack<T> {
//   private storage: T[] = [];

//   constructor(private capacity: number = Infinity) {}

//   push(item: T): void {
//     if (this.size() === this.capacity) {
//       throw Error("Stack has reached max capacity, you cannot add more items");
//     }
//     this.storage.push(item);
//   }

//   pop(): T | undefined {
//     return this.storage.pop();
//   }

//   peek(): T | undefined {
//     return this.storage[this.size() - 1];
//   }
//   size(): number {
//     return this.storage.length;
//   }}
// const stack = new Stack<string>();
// stack.push("A");
// stack.push("B");
// stack.size(); // Output: 2
// stack.peek(); // Output: "B"
// stack.size(); // Output: 2
// stack.pop();  // Output: "B"
// stack.size(); // Output: 1


// interface IQueue<T> {
//   enqueue(item: T): void;
//   dequeue(): T | undefined;
//   size(): number;
// }


// class Queue<T> implements IQueue<T> {
//   private storage: T[] = [];
//   constructor(private capacity: number = Infinity) {}

//   enqueue(item: T): void {
//     if (this.size() === this.capacity) {
//       throw Error("Queue has reached max capacity, you cannot add more items");
//     }
//     this.storage.push(item);
//   }
//   dequeue(): T | undefined {
//     return this.storage.shift();
//   }
//   size(): number {
//     return this.storage.length;
//   }
// }


// const queue = new Queue<string>();

// queue.enqueue("A");
// queue.enqueue("B");
// queue.enqueue("c")

// queue.size();    // Output: 3
// queue.dequeue(); // Output: "A"
// queue.size();    // Output: 2


// class LNode<T> {
//   data: T;
//   next: LNode<T>;

//   constructor(val: T) {
//     this.data = val;
//   }
// }

// class LinkedList<T> {
//   head: LNode<T>;

//   add(val: T) {
//     const newNode = new LNode(val);

//     // if we don't have 'head'
//     if (!this.head) {
//       this.head = newNode;
//       return;
//     }

//     // if we have 'head'

//     let currentNode = this.head;

//     // [] => [] => [] => [] => null
//     //                          ^
//     //  ^
//     while (currentNode.next != undefined) {
//       // null
//       currentNode = currentNode.next;
//     }

//     currentNode.next = newNode;
//   }

//   prepend(val: T) {
//     const newNode = new LNode(val);
//     newNode.next = this.head;
//     this.head = newNode;
//   }

//     search(val: T) {

//         let currentNode = this.head;
//         while(currentNode) {
//             if(currentNode.data === val) {
//                 return currentNode;
//             }
//             currentNode = currentNode.next;
//         }

//     }

//     delete(val: T) {

//         let currentNode = this.head;


//     }
// }

// const l = new LinkedList<number>();
// l.add(1);
// l.add(2);
// l.add(3);
// console.log(l);

// const quicksort = (arr) => {
//   if (arr.length <= 1) {
//     return arr;
//   }
//   const pivot = arr[Math.floor(arr.length / 2)];
//   const left = [];
//   const right = [];

//   for (let i = 0; i < arr.lenght; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }

//   return [...quicksort(left), pivot, ...quicksort(right)];
// };

// const mergeArr = (left, right) => {
//   const result = [];
// };

// const mergeSort = (arr) => {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const mid = Math.floor(arr.length / 2);

//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);

//   return mergeArr(mergeSort(left), mergeSort(right));
// };