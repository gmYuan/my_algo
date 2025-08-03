/*


*/

export {};

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
    this.siftUp(this.size);
  }

  deque() {
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
      let ldx = idx * 2 + 1,
        rdx = ldx + 1;
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
  // 较小部分的 最大堆: 通过取反，用其负数值模拟 大顶堆
  private left: minHeap<number>;
  // 较大部分的 最小堆
  private right: minHeap<number>;

  constructor() {
    // 保证 left.size === right.size 或者 left.size === right.size + 1
    this.left = new minHeap((a, b) => a < b);
    this.left = new minHeap((a, b) => a < b);
  }

  // todo enque的正负值待确认
  addNum(num: number): void {
    // 成员个数相等，统一逻辑以简化代码：进右出最小的，进左
    if (this.left.size === this.right.size) {
      this.right.enque(num);
      this.left.enque(this.right.deque());
    } else {
      // left.size === right.size + 1，统一逻辑以简化代码：进左出最大的，进右
      this.left.enque(-num);
      this.right.enque(this.left.deque());
    }
  }

  findMedian(): number {
    return this.left.size > this.right.size
      ? this.left.peek
      : (this.right.peek - this.left.peek) / 2;
  }
}
