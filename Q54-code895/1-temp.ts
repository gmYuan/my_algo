/*
设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出 出现频率最高的元素。

实现 FreqStack 类:

FreqStack() 构造一个空的堆栈。
void push(int val) 将一个整数 val 压入栈顶。
int pop() 删除并返回堆栈中出现频率最高的元素。
如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。
 

示例 1：
输入：
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]

输出：[null,null,null,null,null,null,null,5,7,5,4]

解释：
FreqStack = new FreqStack();
freqStack.push (5);//堆栈为 [5]
freqStack.push (7);//堆栈是 [5,7]
freqStack.push (5);//堆栈是 [5,7,5]
freqStack.push (7);//堆栈是 [5,7,5,7]
freqStack.push (4);//堆栈是 [5,7,5,7,4]
freqStack.push (5);//堆栈是 [5,7,5,7,4,5]

freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。
 

提示：
0 <= val <= 109
push 和 pop 的操作数不大于 2 * 104。
输入保证在调用 pop 之前堆栈中至少有一个元素。

*/

export {};

class FreqStack {
  // idx是 频率freq，val是 出现的元素栈
  private buckets: number[][] = [];
  // key是num, val是freq
  private freqs = new Map<number, number>();

  push(val: number): void {
    const freq = (this.freqs.get(val) ?? 0) + 1;
    this.freqs.set(val, freq);
    // 如果当前频率超过现有栈数，创建新栈
    (this.buckets[freq] ??= []).push(val);
  }

  pop(): number {
    const val = this.buckets.at(-1).pop();
    // 如果最高频率栈为空，移除该栈
    if (!this.buckets.at(-1).length) this.buckets.pop();
    // 更新频率
    const freq = this.freqs.get(val) - 1;
    freq ? this.freqs.set(val, freq) : this.freqs.delete(val);
    return val;
  }
}
