/**
 * 排序- 归并排序
 *   步骤：
 *     S1 对所有要排序元素递归进行二分拆分，直到分到每1个元素作为单独1组
 *     S2 自底向上进行归并+排序
 *     S3                     0~10
 *                            /      \
 *                         0~5     6~10
 *                        /   \
 *                     0~2     3~5
 *                      / \      / \
 *                    0~1  2  3~4  5
 *                    /  \
 *                 0 (0) 1 (1)
 * 
 *    S3.1  merge(0,0,1) 即 merge(0, 1)  ==> merge(0,1,2)   即merge(0,2)
 *   S3.2  merge(3,3,4) 即 merge(3, 4)  ==> merge(3,4,5)  即merge(3,5)
 *   S3.3  merge(0,2,5) 即 merge(0,5)
 *   右侧过程类似，直到最后完成 merge(0, 10)
 * 
**/


// 归并排序
class MergeSort {
  arr: any[]
  constructor(arr) {
    this.arr = arr
  }

  sort() {
    this.innerSort(0, this.arr.length - 1)
  }

  // 递归排序
  private innerSort(left:number, right:number) {
    // 递归终止条件：拆分到了每组只有1个元素
    if (left >= right) return
    const mid = Math.floor( (left + right) / 2)
    // 进行二分拆分
    this.innerSort(left, mid)
    this.innerSort(mid + 1, right)
    // 拆分完成后进行合并
    this.merge(left, mid, right)
  }

  // 实现合并排序
  private merge(left, mid, right) {
    let copyArr = [...this.arr]
    let i = left, j = mid + 1
    for (let k = left; k <= right; k++) {
      if (i > mid) {
        this.arr[k] = copyArr[j++]
      } else if (j > right) {
        this.arr[k] = copyArr[i++]
      } else if (copyArr[i] < copyArr[j]) {
        this.arr[k] = copyArr[i++]
      } else {
        this.arr[k] = copyArr[j++]
      }
    }
  }

}


const temp = [10, 4, 3, 8, 7]
// const temp = [10,4, 3]
let ex = new MergeSort(temp)
ex.sort()
console.log(ex)
