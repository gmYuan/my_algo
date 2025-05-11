/**
code155-最小栈

题目描述:
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:
MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。

*/


export {}

class MinStack {
  stack: Array<number[]>
 
  constructor() {
    this.stack = [[Number.MIN_VALUE, Number.MIN_VALUE]]
  }

  push(val: number): void {
    this.stack.push([val, Math.min(this.getMin(), val)])
  }

  pop(): void {
    this.stack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1][0]
  }

  getMin(): number {
    return this.stack[this.stack.length - 1][1]
  }
}
