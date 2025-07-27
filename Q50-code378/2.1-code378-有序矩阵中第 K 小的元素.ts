/*
给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。

你必须找到一个内存复杂度优于 O(n2) 的解决方案。

示例 1：
输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
输出：13
解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13

示例 2：
输入：matrix = [[-5]], k = 1
输出：-5
 

提示：
n == matrix.length
n == matrix[i].length
1 <= n <= 300
-109 <= matrix[i][j] <= 109
题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列
1 <= k <= n2

进阶：
你能否用一个恒定的内存(即 O(1) 内存复杂度)来解决这个问题?
你能在 O(n) 的时间复杂度下解决这个问题吗?
这个方法对于面试来说可能太超前了，但是你会发现阅读这篇文章（ this paper ）很有趣。

*/

export {};

type IItem = { num: number; pos: number[] };

function kthSmallest(matrix: number[][], k: number): number {
  // S1 初始化堆
  const n = matrix.length;
  const heap = minHeap<IItem>((a, b) => a.num < b.num);

  // S2 把第一列的元素放入堆
  for (let row = 0; row < n; row++) {
    heap.add({ num: matrix[row][0], pos: [row, 0] });
  }

  // S3 弹出k-1次，每次弹出后把该行的下一列元素加入堆
  for (let i = 0; i < k - 1; i++) {
    const [row, col] = heap.extract().pos;
    if (col < n - 1) {
      heap.add({ num: matrix[row][col + 1], pos: [row, col + 1] });
    }
  }

  // S4 返回堆顶元素
  return heap.peek().num;
}

function minHeap<T extends IItem>(compare: (a: T, b: T) => boolean) {
  const heap: T[] = [];
  return {
    size: () => heap.length,
    isEmpty: () => heap.length === 0,
    peek: () => heap[0],
    add: (item: T) => {
      heap.push(item);
      siftUp(heap.length - 1);
    },
    extract: () => {
      const ret = heap[0];
      swap(0, heap.length - 1);
      heap.pop();
      siftDown(0);
      return ret;
    },
  };

  function siftUp(idx: number) {
    while (idx > 0) {
      const pdx = ~~((idx - 1) / 2);
      // 说明此时 cur < parent，需要上浮
      const willUp = pdx >= 0 && compare(heap[idx], heap[pdx]);
      if (!willUp) break;
      swap(idx, pdx);
      idx = pdx;
    }
  }

  function siftDown(idx: number) {
    while (1) {
      let ldx = idx * 2 + 1,
        rdx = ldx + 1;
      let ndx = idx;
      if (ldx < heap.length && compare(heap[ldx], heap[ndx])) ndx = ldx;
      if (rdx < heap.length && compare(heap[rdx], heap[ndx])) ndx = rdx;
      if (ndx === idx) break;
      swap(idx, ndx);
      idx = ndx;
    }
  }

  function swap(i: number, j: number) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }
}
