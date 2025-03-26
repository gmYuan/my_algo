/**

[LeetCode] 281. Zigzag Iterator 之字形迭代器
 
Given two 1d vectors, implement an iterator to return their elements alternately.
Example:
[1,3,2,4,5,6]

Explanation:
false
[1,3,2,4,5,6]

Follow up: What if you are given k 1d vectors? How well can your code be extended to such cases?
Clarification for the follow up question:The "Zigzag" order is not clearly defined and is ambiguous for k > 2 cases. If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic". 

For example:
Input:
[1,2,3]
[4,5,6,7]
[8,9]

Output: 
[1,4,8,2,5,9,3,6,7]
*/

/**
 * Your ZigzagIterator object will be instantiated and called as such:
 * var v1: number[] = [1,2];
 * var v2: number[] = [3,4,5,6];
 * var obj: ZigzagIterator = new ZigzagIterator(v1, v2);
 * var param_1: number = obj.next();
 * var param_2: boolean = obj.hasNext();
 */

class ZigzagIterator {
  private queue: Array<{
    arr: number[];
    idx: number;
  }>;

  constructor(v1: number[], v2: number[]) {
    this.queue = [];
    if (v1.length > 0) this.queue.push({ arr: v1, idx: 0 });
    if (v2.length > 0) this.queue.push({ arr: v2, idx: 0 });
  }

  // 支持是k个数组的情况：修改构造函数，接收数组的数组
  // constructor(vectors: number[][]) {
  //   this.queue = [];
  //   // 将所有非空数组加入队列
  //   for (const arr of vectors) {
  //     if (arr.length > 0) {
  //       this.queue.push({ arr, index: 0 });
  //     }
  //   }
  // }

  next(): number {
    if (!this.hasNext()) return -1;
    const { arr, idx } = this.queue.shift();
    const val = arr[idx];
    if (idx + 1 < arr.length) {
      this.queue.push({ arr, idx: idx + 1 });
    }
    return val;
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }
}
