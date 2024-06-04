// leetcode对应题目-  912排序数组


// 快速排序3-双路快排以优化 重复元素情况
class quickSort3 {
  constructor(arr) {
    this.arr = arr;
  }

  sort() {
    this.innerSort(0, this.arr.length - 1);
  }

  innerSort(left, right) {
    if (left >= right) return;
    let p = this.partition(left, right);
    this.innerSort(left, p - 1);
    this.innerSort(p + 1, right);
  }

  // 双路快排的partiton过程: [left+1, front-1] <= base && [tail+1, right] >= base
  partition(left, right) {
    const arr = this.arr;
    const rdx = Math.floor(Math.random() * (right - left + 1)) + left
    this.swap(left, rdx);

    let base = arr[left];
    let front = left + 1, tail = right;
    // 始终保持[left+1, front-1] <= base && [tail+1, right] >= base
    while (front <= tail) {
      while (arr[front] < base)  front++;
      while (arr[tail] > base) tail--;
      // 注意点3: 这一步是必须的，也是易错点
      // 因为当front>=tail时，说明[left, front-1]都<=val, [tail+1, right]都>=val
      // 则此时已经分类完arr所有成员，如果后续再交换front和tail的位置反而会破坏分组的正确性
      if (front >= tail) break;
      
      // 保证了等于base的成员 被均分到了front/tail的各自范围内
      this.swap(front, tail);
      front++;
      tail--;
    }
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





