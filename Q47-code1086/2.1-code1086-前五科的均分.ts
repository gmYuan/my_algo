/*
题目大意：
1086. High Five

Given a list of the scores of different students, 
items, where items[i] = [IDi, scorei] represents 
one score from a student with IDi, 
calculate each student's top five average.

Return the answer as an array of pairs result, 
where result[j] = [IDj, topFiveAveragej] represents 
the student with IDj and their top five average. 
Sort result by IDj in increasing order.


A student's top five average is calculated by 
taking the sum of their top five scores and
dividing it by 5 using integer division.

Example 1:

Input: items = [
  [1,91],[1,92],
  [2,93],[2,97],
  [1,60],
  [2,77],
  [1,65], [1,87],[1,100],
  [2,100],[2,76]
]
Output: [ [1,87],[2,88] ]

Explanation: 
The student with ID = 1 got scores 91, 92, 60, 65, 87, and 100. 
Their top five average is (100 + 92 + 91 + 87 + 65) / 5 = 87.
T
he student with ID = 2 got scores 93, 97, 77, 100, and 76. 
Their top five average is (100 + 97 + 93 + 77 + 76) / 5 = 88.6, 
but with integer division their average converts to 88.

Example 2:
Input: items = [
  [1,100]
  [7,100],
  [1,100],
  [7,100],
  [1,100],
  [7,100],
  [1,100],
  [7,100],

Output: [[1,100],[7,100]]

Constraints:
  1 <= items.length <= 1000
  items[i].length == 2
  1 <= IDi <= 1000
  0 <= scorei <= 100
  For each IDi, there will be at least five scores.

题意是给一个二维数组，里面包含了一些人的考试成绩，
以 [id, score] 的形式给出。
请你返回一个二维数组，表示每个 id 的最高的五个分数的平均分

*/

export {};

function highFive(items: number[][]): number[][] {
  // S1 创建id和scores映射关系
  const record = items.reduce((map, [id, score]) => {
    map.set(id, [...(map.get(id) ?? []), score]);
    return map;
  }, new Map<number, number[]>());

  // S2 使用大小为5的最小堆获取最大的5个分数
  return [...record.entries()]
    .map(([id, scores]) => {
      const heap = minHeap<number>((a, b) => a < b);
      // 维护大小为5的最小堆，使用链式调用
      scores.forEach((score) =>
        heap.size() < 5
          ? heap.add(score)
          : score > heap.peek() && (heap.remove(), heap.add(score))
      );

      // 计算平均值，使用Array.from
      const sum = Array.from({ length: 5 }, heap.remove).reduce(
        (a, b) => a + b,
        0
      );
      return [id, ~~(sum / 5)];
    })
    .sort((a, b) => a[0] - b[0]);
}

function minHeap<T>(compare: (a: T, b: T) => boolean) {
  const heap: Array<T> = [];
  return {
    size: () => heap.length,
    empty: () => heap.length === 0,
    // 查看堆顶元素
    peek: () => heap[0],
    // 在末尾新增
    add: (item: T) => {
      heap.push(item);
      siftUp(heap.length - 1);
    },
    // 去除堆顶元素
    remove: (): T => {
      if (heap.length === 0) return;
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
      // compare为true，表示a < b，即 当前元素 < parent值
      const willUp = compare(heap[idx], heap[pdx]);
      if (!willUp) break;
      swap(idx, pdx);
      idx = pdx;
    }
  }

  function siftDown(idx: number) {
    while (1) {
      const ldx = idx * 2 + 1;
      const rdx = idx * 2 + 2;
      let next = idx;
      // 如果左子元素较小，则 可能需要让当前元素 下沉
      if (ldx < heap.length && compare(heap[ldx], heap[next])) next = ldx;
      // 如果右子元素较小，则 可能需要让当前元素 下沉
      if (rdx < heap.length && compare(heap[rdx], heap[next])) next = rdx;
      if (next === idx) break;
      swap(idx, next);
      idx = next;
    }
  }

  function swap(i: number, j: number) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }
}
