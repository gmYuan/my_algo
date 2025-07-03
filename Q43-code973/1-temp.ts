type TPoint = ReturnType<typeof createPointsWithDis>[number];
type THeap<T> = ReturnType<typeof createMaxHeap<T>>;

function kClosest(points: number[][], k: number): number[][] {
  // S1 创建带有距离的Point
  const pointsWithDis = createPointsWithDis(points);
  // S2 创建最大堆
  const heap: THeap<TPoint> = createMaxHeap<TPoint>((a, b) => a.dis - b.dis);
  // S3 在堆中处理点，并返回处理后的堆
  const processedHeap = pointsWithDis.reduce(processPoint(k), heap);
  // S4 返回堆中的点
  return processedHeap.getArr().map(({ point }) => point);
}

function createPointsWithDis(points: number[][]) {
  return points.map(([x, y]) => ({
    point: [x, y],
    dis: x * x + y * y,
  }));
}

function createMaxHeap<T>(compare: (a: T, b: T) => number) {
  const heap: T[] = [];
  return {
    getSize,
    peek,
    add,
    replace,
    getArr: () => heap,
  };

  function getSize() {
    return heap.length;
  }

  function peek() {
    return heap[0];
  }

  function add(item: T) {
    heap.push(item);
    siftUp(getSize() - 1);
  }

  function replace(item: T) {
    const max = peek();
    heap[0] = item;
    siftDown(0);
    return max;
  }

  function siftUp(idx: number) {
    //S1 循环更新：比较父节点与当前节点大小
    //S2 当 当前节点值 > 父节点值 时，则交换位置 + 更新当前index
    while (idx > 0) {
      const parentIdx = ~~((idx - 1) / 2);
      const curIsLarger = compare(heap[idx], heap[parentIdx]) > 0;
      if (!curIsLarger) break;
      swap(heap, idx, parentIdx);
      idx = parentIdx;
    }
  }

  function siftDown(idx: number) {
    // 上浮/下沉是一个 深度比较操作，所以需要循环更新
    while (1) {
      // S1 获取左右子节点中较大索引值
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let largerIdx = idx;

      if (left < getSize() && compare(heap[left], heap[largerIdx]) > 0) {
        largerIdx = left;
      }
      if (right < getSize() && compare(heap[right], heap[largerIdx]) > 0) {
        largerIdx = right;
      }
      // S2 比较子节点和当前节点值，子节点较小时 则停止，否则交换位置
      if (largerIdx === idx) break;
      swap(heap, idx, largerIdx);
      idx = largerIdx;
    }
  }
}

function swap(arr: any[], l: number, r: number) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}

function processPoint(k: number) {
  return (heap: THeap<TPoint>, point: TPoint) => {
    if (heap.getSize() < k) {
      heap.add(point);
    } else if (point.dis < heap.peek().dis) {
      heap.replace(point);
    }
    return heap;
  };
}
