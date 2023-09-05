/**
 * 排序- 快速排序
 * 
 * 步骤：
 * S1 对[left, right]区间内 某个元素A进行正确排序(partition)；假设其正确位置为j，则 [left, j-1] < A 且 [j+1, right] > A
 * S2 A完成排序后，继续递归调用排序，不过范围缩减为[left, j-1] & [j+1, right]
 * S3 递归执行，直到left<=right，说明排序完成
 * 
 * partition实现步骤
 * 目标：对于任意一个元素A，找到一个值J，使得 [left, j-1] < A 且 [j+1, right] > A
 * S1 初始化A，默认为范围内的首个元素：curSortValue = this.arr[left]
 * S2 初始化J，默认值为 left：即默认 不存在小于A的元素，即 该元素已被正确排序
 * S3 在 [left+1, right] 范围内，依次取值B 和 A 进行比较，当 B < A时，说明存在比A小的元素
 *      此时要 记录比A小的元素的个数 & 更新比A小的区间D1的 右边界 (j++)  + 把B放到这个区间D1内 ( swap(i, j) )
 * 
 * S4 比较完成后，j的值就是D1的右边界，再交换left和J的位置，就能确保A位于J，从而使[left, j-1]都小于A
 * 
 * 举例  [3, 7, 6, 2, 1]
 * S1  partition(0, 4) --> A = 3, j=0, i = 1
 * S2  i = 3时：j = 1且数组为 [3, 2, 6, 7, 1 ]
 * S3  i = 4时：j = 2且数组为 [3, 2, 1, 7, 6 ]
 * S4 把 A放到 右边界J的位置, 即 [1, 2, 3, 7, 6] + 返回 j = 2
 * 
 * 同理 partiton(0,1) + partition(3,4)
 * partition(3,4) ==> [7, 6] 且 j = 3, i = 4, right = 4 ==> swap(4,4) ==> swap(3,4)==>  即 [6,7] + 返回j=4
 * 
 * 
 * 快速排序1存在的问题：
 * 1 对于近乎有序的数组时，由于partition拆分后极度右倾(n)，每个倾斜的partition复杂度是n，所以复杂度为n*n;
 * 2 对于有大量相同值的数组，同样会造成partiton拆分后极度左倾/右倾，从而使 复杂度趋向于 n*n
 * 
 * 针对这2个问题，优化为quickSort2，优化手段有：
 * 1 对于元素长度较小情况，直接使用插入排序；
 * 2 针对有序情况，随机取A值而不是固定取left位置的值，这样右倾的概率就无限小；
 * 3 针对相同值情况，使用双路快排，使 [left, i) <= A 且 [j, right] >= A
 * 
 * 
 * 更近一步的优化实现 quickSort3，即三路快排
 * 示意图，参见  https://gitee.com/ygming/blog-img/raw/master/img/quickSort.jpeg
 * 
 * 目标： 构建3个区间
 *    [ left,    [left+1, lt],     [lt+1, i-1],     [gt, right] ,        i    ]
 *       A       都小于A         等于A           大于A       当前循环值
 * 
 * S1 初始化 A/lt/gt/i值： A = arr[left], lt = left(这样小于A的区间默认为空数组)，gt = right+1(使 大于A的为空)
 * S2 循环更新i值，
 *    当 B<A时，lt右移 + i右移；
 *    当 B=A时， i右移 即可；
 *    当 B>A时，把 arr[gt-1]C 和B进行交换 + gt左移，此时i的值就是之前的 C，继续进行比较即可
 * 
 * S3 当 i > gt时，说明之后值都是大于i的，没有必要再进行拆分区间了，此时已经完成了目标
 * S4 把 A 放入正确的区间范围[lt+1, i-1]内的第一个， 即 swap(left, lt)
 * S5 返回 lt和gt后，继续处理 数组除了A之后的剩余元素
**/


// 快速排序1
class quickSort {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }
  sort(){
    this.innerSort(0, this.arr.length - 1)
  }

  private innerSort(left, right) {
    if (left >= right) return
    let j = this.partition(left, right)
    this.innerSort(left, j-1)
    this.innerSort(j+1, right)
  }

  private partition(left, right): number {
    let curSortValue = this.arr[left]
    let j = left   // arr[left+1...j] < v ; arr[j+1...i) >= v

    for (let i = left + 1; i <= right; i++) {
      if ( this.arr[i] < curSortValue ) {
        j++
        this.swap(i, j)
      }
    }
    this.swap(left, j)
    return j
  }

  private swap(i, j) {
    [ this.arr[i], this.arr[j] ] = [ this.arr[j], this.arr[i] ]
  }
}

// 快速排序2
class quickSort2 {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }
  sort(){
    this.innerSort(0, this.arr.length - 1)
  }

  private innerSort(left, right) {
    //优化1: 对于小规模数组, 使用插入排序
    // if( right - left <= 15 ){
    //   //InsertionSort.sort(arr, l, r);
    //   return;
    // }
    if (left >= right) return

    let j = this.partition(left, right)
    this.innerSort(left, j-1)
    this.innerSort(j+1, right)
  }

  private partition(left, right): number {
    // 优化2 随机取值，而不是固定取left位置的值，作为定位元素
    // [0,1) ==> [0, right-left + 1) ==> [left, right+1) ==> Math.floor(right+0.6) ==> [left,rigth] 
    this.swap(left , Math.floor(Math.random() * (right - left + 1)) + left )
    let curSortValue = this.arr[left]

    //优化3 双路快排：[left+1, i) <= A 且 (j, right] >= A
    let i = left+1; let j = right
    while(true) {
      while (i <= right && this.arr[i] < curSortValue) {
        i++
      }
      while (j >= left+1 &&this.arr[j] > curSortValue) {
        j--
      }
      if (i > j) break;
      // 否则，说明 arr[i] >= A && arr[j] <= A
      // 交换位置，使得arr[i]/arr[j]分别处于正确的区间内
      // 这样，当存在大量和A相等的元素时，也能被均匀的分在2个区间中，而不是极度向左侧/右侧倾斜
      this.swap(i, j)
      i++
      j--
    }
    // 完成区间拆分后，[left+1, i)<A, (j,right]>A
    // 所以进行交换，让A处于j位置
    this.swap(left, j)
    return j
  }

  private swap(i, j) {
    [ this.arr[i], this.arr[j] ] = [ this.arr[j], this.arr[i] ]
  }
}

class quickSort3 {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }
  sort() {
    this.innerSort(0, this.arr.length - 1)
  }

  private innerSort(left, right) {
    if (left >= right) return;
    let [lt, gt] = this.partition(left, right)

    // 继续处理排除了A的 数组剩余元素
    this.innerSort(left, lt-1)
    this.innerSort(gt, right)
  }

  private partition(left, right) {
    this.swap(left,  Math.floor( Math.random() * (right - left + 1) + left) )
    let curSortValue = this.arr[left]

    let lt = left           // arr[left+1, lt] < A
    let i = left + 1       // arr [lt+1, i) == A
    let gt = right + 1   // arr[gt, right] > A

    while (i < gt) {
      if (this.arr[i] < curSortValue) {
        //arr[i] 即B < A时， 把 B放到lt区间 + 扩展lt区间 + 处理下一个值
        this.swap(i, lt+1)
        lt++
        i++
      } else if (this.arr[i] === curSortValue) {
        // B = A时，扩展i区间 + 处理下一个值
        i++
      } else {
        // B > A时， 把B放到gt区间内 + 扩展gt区间；此时i的值就是交换过来的C，继续处理C即可
        this.swap(i, gt-1)
        gt--
      }
    }

    // 把A放到 lt位置，从而使[left, lt] < A 继续成立，同时A交换位置后，lt也并入了相等的区间
    this.swap(left, lt)
    // 返回 lt 和 gt
    return [lt, gt]
  }

  private swap(i, j) {
    [ this.arr[i], this.arr[j] ] =  [ this.arr[j], this.arr[i] ]
  }
}


const temp = [3, 7, 6, 2, 1, 3]
let ex = new quickSort3(temp)
ex.sort()
console.log(ex)