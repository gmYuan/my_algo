
// 快速排序4- 三路快排
class quickSort4 {
  arr: any;
  constructor(arr) {
    this.arr = arr;
  }

  sort() {
    this.innerSort(0, this.arr.length - 1);
  }

  innerSort(left, right) {
    if (left >= right) return;
    const [lt, gt] = this.partition(left, right);
    // 由于此时[lt, gt-1]都说等于base的值，所以分别继续处理 lt-1和gt的范围成员 即可
    this.innerSort(left, lt - 1);
    this.innerSort(gt, right);
  }


  // partition目标：
  partition(left, right) {
    // 随机化基准元素
    const arr = this.arr;
    const rdx = Math.floor(Math.random() * (right - left + 1) + left)
    this.swap(left, rdx);
    // 获取基准值
    const base = arr[left]

    // 保持[left+1, lt]都<val, [lt+1, i)都=val, [gt, right]都>val
    let lt = left, gt = right + 1, i = left + 1
    while (i < gt) {
      if (arr[i] < base) {
        // cur < base时， 把 cur放到lt区间 & 扩展lt区间 + 处理下一个值
        this.swap(i++, ++lt)
      } else if (arr[i] === base) {
        i++
      } else {
         // cur > base时， 把cur放到gt区间内 + 缩短gt区间；此时i的值就是交换过来的C，继续处理C即可
        this.swap(i, --gt)
      }
    }

    // 把base放到 lt位置，从而更新为 [left, lt-1] < base && [lt, gt-1] === base && [gt, right] > base
    // 返回 lt 和 gt
    return [lt, gt]
  }

  swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}


const temp = [3, 7, 6, 2, 1, 3, 1, 2];
let ex = new quickSort4(temp);
ex.sort();
console.log(ex.arr);
