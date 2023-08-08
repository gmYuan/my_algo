/**
 * 排序- 归并排序
 *   步骤：
 *     S1 对所有要排序元素递归进行二分拆分，直到分到每1个元素作为单独1组
 *     S2 自底向上进行归并+排序
 *     S3                       0~10
 *                           /      \
 *                         0~5     6~10
 *                        /    \
 *                     0~2     3~5
 *                      / \    / \
 *                    0~1 2   3~4  5
 *                    /  \
 *                 0 (0) 1 (1)
 * 
 *   S3.1  merge(0,0,1) 即 merge(0, 1)  ==> merge(0,1,2)  即merge(0,2)
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

  // 递归含义: 合并[left, right]范围内的数组成员
  private innerSort(left:number, right:number) {
    // 递归终止条件：拆分到了每组只有1个元素
    if (left >= right) return
    const mid = Math.floor( left + (right - left) / 2)
    // 合并左区间
    this.innerSort(left, mid)
    // 合并右区间
    this.innerSort(mid + 1, right)
    // 对左右有序区间 进行合并
    this.merge(left, mid, right)
  }

  //合并2个有序区间 arr[left, mid] 和 arr[mid+1, right]
  private merge(left: number, mid:number, right: number) {
    // 拷贝一份原数组，因为后续原数组内容会被更改
    let copyArr = [...this.arr]
    let leftStart = left, rightStart = mid + 1

    for (let resIdx = left; resIdx <=right; resIdx++) {
      // 如果左侧有序数组都被处理完毕，只需要直接填入右侧内容
      if (leftStart > mid) {
        this.arr[resIdx] = copyArr[rightStart]
        rightStart++
      // 同上，右侧越界了只需要填入左侧内容
      } else if (rightStart > right) {
        this.arr[resIdx] = copyArr[leftStart]
        leftStart++
      // 左右都没越界，再开始比较大小，较小的填入到原数组即可
      } else if (copyArr[leftStart] < copyArr[rightStart]) {
        this.arr[resIdx] = copyArr[leftStart]
        leftStart++
      } else {
        this.arr[resIdx] = copyArr[rightStart]
        rightStart++
      }
    }
  }

}


const temp = [10, 4, 3, 8, 7]
let ex = new MergeSort(temp)
ex.sort()
console.log(ex)
