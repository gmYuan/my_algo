/**
code232-用栈实现队列

你仅使用两个栈实现先入先出队列。
队列应当支持一般队列支持的所有操作（push、pop、peek、empty）

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false

说明：
你 只能 使用标准的栈操作 —— 也就是
  只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。

你所使用的语言也许不支持栈。
  你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

*/

export {};

class MyQueue {
  in: number[];
  out: number[];
  front: number;

  constructor() {
    this.in = [];
    this.out = [];
  }

  push(x: number): void {
    if (!this.in.length) this.front = x;
    this.in.push(x);
  }

  pop(): number {
    if (!this.out.length) {
      while (this.in.length) this.out.push(this.in.pop());
    }
    return this.out.pop();
  }

  peek(): number {
    if (!this.out.length) return this.front;
    return this.out[this.out.length - 1];
  }

  empty(): boolean {
    return !this.in.length && !this.out.length;
  }
}
