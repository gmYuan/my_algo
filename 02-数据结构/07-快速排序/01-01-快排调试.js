// 快速排序3-双路快排以优化 重复元素情况
class quickSort3 {
  constructor(arr) {
    this.arr = arr;
  }

  sort() {
    this.innerSort(0, this.arr.length - 1);
  }

  innerSort(left, right) {
    //优化1: 对于小规模数组, 使用插入排序
    // if( right - left <= 15 ){
    //   //InsertionSort.sort(arr, l, r);
    //   return;
    // }

    if (left >= right) return;
    let p = this.partition(left, right);
    this.innerSort(left, p - 1);
    this.innerSort(p + 1, right);
  }

  // partition目标：把基准元素base 放到其正确排序位置front + 返回其位置索引front
  // 即[left, front] <= val && [tail, right] >= val
  partition(left, right) {
    const arr = this.arr;
    // 优化点1: 随机化base值，让它随机取值，而不是第1版固定的取最左侧元素
    // [0,1) ==> [0, right-left + 1) ==> [left, right+1)==> 由于可能是0.6 * 11，所以需要向下取整
    const rdx = Math.floor(Math.random() * (right - left + 1)) + left
    this.swap(left, rdx);

    let base = arr[left];
    let front = left + 1, tail = right;
    // 始终保持[left+1, front-1] <= base && [tail+1, right] >= base
    while (true) {
      while (front <= tail && arr[front] < base) {
        front++;
      }
      while (tail >= front && arr[tail] > base) {
        tail--;
      }
      if (front >= tail) break;

      // 执行到此处时，必然成立 arr[front]值>=base && arr[tail]值<=base
      // 此时，交换 front和tail位置，才可保持循环不变量的性质继续成立
      this.swap(front, tail);
      // 移动指针，看下一个元素值
      front++;
      tail--;
    }

    // 执行到此时，此时front和tail都越界了: tail处于<base的位置，front处于>=base，所以取tail而非front
    // 交换left和tail后，完成partition目标: [left, tail-1] <= val && [tail, right] >= val
    this.swap(left, tail);
    return tail;
  }

  swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}

const temp = [3, 7, 6, 2, 1, 3, 1, 2, 9, 8];
let ex = new quickSort3(temp);
ex.sort();
console.log(ex.arr);
