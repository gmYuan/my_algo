/**

题目链接：
https://leetcode.cn/problems/implement-stack-using-queues/description/

*/

// 方法2
class MyStack {
  queue: Array<number>;

  constructor() {
    this.queue = [];
  }

  push(x: number): void {
    // 记录添加x前的 队列已有内容数量--> 加入x--> 弹出x之前的内容 & 重新推入x之前的内容
    let size = this.queue.length;
    this.queue.push(x);
    while (size > 0) {
      this.queue.push(this.queue.shift());
      size--;
    }
  }

  pop(): number {
    return this.queue.shift();
  }

  top(): number {
    return this.queue[0];
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}
