/**
 * 排序- 快速排序
 * 
 * 基础版-快速排序版本1 步骤:
 * S1 对[left, right]区间内 某个元素A进行正确排序(partition)；假设其正确位置为j，则 [left, j-1] < A 且 [j, right] >= A
 * S2 A完成排序后，继续递归调用排序，范围缩减为[left, j-1] & [j+1, right]
 * S3 递归执行，直到left<=right，说明排序完成
 * 
 * partition实现步骤: 
 * 目标：对于任意一个元素A，找到一个索引值j，使得 [left, j-1] < A 且 [j, i] >= A
 * S1 初始化A，默认为范围内的首个元素：willSort = this.arr[left]
 * S2 初始化 j = left && i = left+1: 保证 [left+1, j]< A 为空 && [j+1, i] >=A 成员只有A
 * 
 * S3 在[left+1, right] 范围内，逐次取值B 和 A 进行比较: 
 *   - 当B < A时，说明存在比A小的元素, 即 小于A的数组范围要扩大: j后移1位 + 交换i和j的元素 ==>
 *     - j扩大1后，此时的j指向的元素值必然是>=A && i指向的是<A的 ==> 
 *       交换i和j后，才依然满足 [left+1, j] < A && [j+1, i] >= A
 * 
 *   - 当 B > A时，继续自然增加i即可，以保持[j+1,i] >= A 的性质


 * 快速排序1 存在的问题：
 *   - 对近乎有序的数组时，由于partition拆分后极度右倾，所以导致 时间复杂度为O(n*n), 空间复杂度为O(n)
 *   - 对于有大量重复元素的数组排序，同样会造成partition拆分后极度左/右倾，导致时间复杂度退化
 * 
 * 针对问题1，优化为 quickSort2：
 *   - 对于元素长度较小情况，直接使用插入排序
 *   - 针对有序情况，随机取A值 而不是固定取left位置的值，这样右倾的概率就无限小
 *
 * 
 * 针对问题2，优化为 quickSort3：
 *   - 其他步骤的目标和实现都不变，只是partiton实现进行优化
 *   - partiton目标：保证 [left, j] <= base值 && [j+1, right] >= base值 
 *   - 实现：使用头尾指针法front,tail，保证[left+1, front-1]<= base值 && [tail+1, right]>= base值 
 * 
 * 
 * 进一步对于大量重复元素，可以使用三路快排进行优化-- quickSort4:
 *   - 目标： 构建3个区间
 *     [ left,  [left+1, lt],  [lt+1, i-1],  [gt, right] ,    i    ]
 *        A        都小于A         等于A          大于A       当前循环值
 * 
**/



// 快速排序3- 双路快排以优化 重复元素情况
class quickSort3 {
  arr: any;

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

  // partition目标：把基准元素base 放到其正确排序位置tail + 返回其位置索引tail
  // 即[left, front-1] <= val && [tail+1, right] >= val
  partition(left, right) {
    const arr = this.arr;
    // 优化点1: 随机化base值，让它随机取值，而不是第1版固定的取最左侧元素
    // [0,1) ==> [0, right-left + 1) ==> [left, right+1)==> 由于可能是0.6 * 11，所以需要向下取整
    const rdx = Math.floor(Math.random() * (right - left + 1) + left)
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
      // 移动指针，看下一个元素值
      front++;
      tail--;
    }
    // 经过上述步骤处理，base的正确位置就是 front-1/tail, 返回任意一个指针即可 
    this.swap(left, tail);
    return tail;
  }

  swap(i, j) {
    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
  }
}


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
let ex = new quickSort3(temp);
ex.sort();
console.log(ex.arr);
