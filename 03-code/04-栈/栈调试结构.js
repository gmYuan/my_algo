// 功能实现
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

// 只能 使用标准的栈操作 
// 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的


class MyQueue {
  constructor() {
    // 入队栈
    this.enStack = []
    // 出队栈
    this.deStack = []
  }

  push(x: number): void { // 1, 2
    this.enStack.push(x)  // 2, 1
    this.deStack.push(x)  // 2, 1
  }

  pop(): number {   // 1, 2
    this.enStack

  }

  peek(): number {}

  empty(): boolean {}
}
