/*
中位数是有序整数列表中的中间值。
如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

例如 arr = [2,3,4] 的中位数是 3 。
例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5 。

实现 MedianFinder 类:
  - MedianFinder() 初始化 MedianFinder 对象。
  - void addNum(int num) 将数据流中的整数 num 添加到数据结构中。
  - double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10^-5 以内的答案将被接受。

 
示例 1：
输入
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
输出
[null, null, null, 1.5, null, 2.0]

解释
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0

提示:

-10^5 <= num <= 10^5
在调用 findMedian 之前，数据结构中至少有一个元素
最多 5 * 10^4 次调用 addNum 和 findMedian

*/

export {};

/*
实现思路

*/

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

class minHeap<T> {
  private data: T[];
  private compare: (a: T, b: T) => boolean;

  constructor(compare: typeof this.compare) {
    this.compare = compare;
    this.data = [];
  }

  // 使用 getter 替代方法
  get size() {
    return this.data.length;
  }

  get peek() {
    return this.data[0];
  }

  enque(item: T) {
    this.data.push(item);
    this.siftUp(this.size - 1);
  }

  deque() {
    // 易错点1：如果堆为空，直接返回，防止堆中误进入'undefined'
    if (this.size === 0) return;
    // 易错点2：只有一个的时候直接出队，防止后续操作数组长度不会减少
    if (this.size === 1) return this.data.pop();
    const ret = this.data[0];
    this.data[0] = this.data.pop();
    this.siftDown(0);
    return ret;
  }

  private siftUp(idx: number) {
    while (idx > 0) {
      const pdx = (idx - 1) >> 1;
      // compre为true: a < b; 即 cur < parent
      const willUp = pdx >= 0 && this.compare(this.data[idx], this.data[pdx]);
      if (!willUp) break;
      this.swap(idx, pdx);
      idx = pdx;
    }
  }

  private siftDown(idx: number) {
    while (1) {
      let ldx = idx * 2 + 1, rdx = ldx + 1;
      let ndx = idx;
      if (ldx < this.size && this.compare(this.data[ldx], this.data[ndx]))
        ndx = ldx;
      if (rdx < this.size && this.compare(this.data[rdx], this.data[ndx]))
        ndx = rdx;
      if (ndx === idx) break;
      this.swap(idx, ndx);
      idx = ndx;
    }
  }

  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

class MedianFinder {
  // 较小部分的 最大堆: 通过compare来控制反转为 最大堆
  private left: minHeap<number>;
  // 较大部分的 最小堆
  private right: minHeap<number>;

  constructor() {
    // 保证 left.size === right.size 或者 left.size === right.size + 1
    this.left = new minHeap((a, b) => a > b);
    this.right = new minHeap((a, b) => a < b);
  }

  addNum(num: number): void {
    // 成员个数相等，统一逻辑以简化代码：进右出最小的，进左
    if (this.left.size === this.right.size) {
      this.right.enque(num);
      this.left.enque(this.right.deque());
    } else {
      // left.size === right.size + 1，统一逻辑以简化代码：进左出最大的，进右
      this.left.enque(num);
      this.right.enque(this.left.deque());
    }
  }

  findMedian(): number {
    return this.left.size > this.right.size
      ? this.left.peek
      : (this.right.peek + this.left.peek) / 2;
  }
}
