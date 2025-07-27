// 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。

type TArrWithFre = ReturnType<typeof createArrWithFre>[number];
type THeap = ReturnType<typeof createMaxHeap>;

function topKFrequent(nums: number[], k: number): number[] {
  const arrWithFre = createArrWithFre(nums);
  const heap = createMaxHeap<TArrWithFre>((a, b) => b.fre - a.fre);
  return arrWithFre.reduce(processArr(k), heap).getNums();
}

function createArrWithFre(arr: number[]) {
  const record = new Map<number, { num: number; fre: number }>();
  arr.map((val) => {
    record.set(val, {
      num: val,
      fre: (record.get(val)?.fre || 0) + 1,
    });
  });
  return [...record.values()];
}

// 修正：添加泛型声明
function createMaxHeap<T extends TArrWithFre>(compare: (a: T, b: T) => number) {
  let heap: T[] = [];
  return {
    getSize,
    peek() {
      return heap[0];
    },
    add(item: T) {
      heap.push(item);
      siftUp(heap.length - 1);
    },
    replace(item: T) {
      const max = heap[0];
      heap[0] = item;
      siftDown(0);
      return max;
    },
    getNums() {
      return heap.map((item) => item.num);
    },
  };

  function getSize() {
    return heap.length;
  }

  function siftUp(idx: number) {
    //S1 循环更新：比较父节点与当前节点大小
    //S2 当 当前节点值 > 父节点值 时，则交换位置 + 更新当前index
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      const curIsLarger = compare(heap[idx], heap[parentIdx]) > 0;
      if (!curIsLarger) break;
      swap(heap, idx, parentIdx);
      idx = parentIdx;
    }
  }

  function siftDown(idx: number) {
    while (1) {
      // 取左右子节点中最大的
      let maxIdx = idx;
      const leftIdx = idx * 2 + 1;
      const rightIdx = idx * 2 + 2;
      if (leftIdx < getSize() && compare(heap[leftIdx], heap[maxIdx]) > 0) {
        maxIdx = leftIdx;
      }
      if (rightIdx < getSize() && compare(heap[rightIdx], heap[maxIdx]) > 0) {
        maxIdx = rightIdx;
      }
      if (maxIdx === idx) break;
      swap(heap, idx, maxIdx);
      idx = maxIdx;
    }
  }

  function swap(arr: T[], l: number, r: number) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
}

function processArr(k: number) {
  return (heap: THeap, cur: TArrWithFre) => {
    if (heap.getSize() < k) {
      heap.add(cur);
    } else if (cur.fre > heap.peek().fre) {
      heap.replace(cur);
    }
    return heap;
  };
}
