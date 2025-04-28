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


解法1：
https://leetcode.cn/problems/min-stack/solutions/243226/3-chong-fang-fa-shi-xian-bi-xu-miao-dong-by-sweeti/


解法2：
https://leetcode.cn/problems/min-stack/solutions/2974438/ben-zhi-shi-wei-hu-qian-zhui-zui-xiao-zh-x0g8/

解法3：插值法



*/

class MinStack {
  private stack: Array<{ number: number }> = [];
  private min: number

  constructor() {
    this.stack = [{ 0: 0 }];
  }

  push(val: number): void {
    this.stack.push({val: Math.min() })
  }

  pop(): void {}

  top(): number {}

  getMin(): number {}
}
