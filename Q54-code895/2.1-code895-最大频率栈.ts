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

/*
1 实现思路

1.1 分析题目要求
  - 需要记录频率
  - 频率相同时要取最近的
  - 最难的是 "频率相同时取最近的" 这个要求
  - 这暗示了我们需要某种方式保存元素的 "时序信息"

1.2 常见数据结构分析
  - 堆？可以，但处理相同频率时需要额外信息
  - 栈？天然保持时序，但不好处理频率
  - Map？可以记录频率，但不保持时序


1.3 关键突破点
  - 如果能把 "相同频率" 的元素放在一起
  - 又能保持它们的入栈顺序
  - 那不就自然解决了问题吗？

1.4 灵感来源
  - 这类题目的一个常见技巧是 "分组"
  - 比如桶排序就是按数值分组
  - 这里我们可以按频率分组！


这种解法的巧妙之处在于：
  - 把频率作为分组依据，自然解决了"找最高频率"的问题
  - 每个频率组用数组存储，自然保持了入栈顺序
  - 通过 maxFreq 变量，避免了每次都要搜索最大频率


*/

class FreqStack {
  private stacks: number[][] = [];
  private freq = new Map<number, number>();

  push(val: number): void {
    const f = (this.freq.get(val) ?? 0) + 1;
    this.freq.set(val, f);
    // 如果当前频率超过现有栈数，创建新栈
    (this.stacks[f - 1] ??= []).push(val);
  }

  pop(): number {
    const val = this.stacks.at(-1)!.pop()!;
    // 如果最高频率栈为空，移除该栈
    !this.stacks.at(-1)!.length && this.stacks.pop();
    // 更新频率
    const f = this.freq.get(val)! - 1;
    f ? this.freq.set(val, f) : this.freq.delete(val);
    return val;
  }
}
