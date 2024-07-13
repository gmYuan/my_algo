/**
 * 排序- 归并排序_自底向上
 *   步骤：
 *   S1 每次以1、2、4、8、2^n个 成员作为1对pair，对 以pair个成员为长度的车厢 进行两两配对
 *   S2 对配对车厢进行排序，直到所有车厢都是有序的
 * 
 *                             0~10
 *                           /      \
 *                         0~5     6~10
 *                        /    \
 *                     0~2     3~5
 *                      / \    / \
 *                    0~1 2   3~4  5
 *                    /  \
 *                 0 (0) 1 (1)
 * 
**/

// 归并排序
class MergeSort {
  arr: number[]
  constructor(arr) {
    this.arr = arr
  }

  sort() {
    const len = this.arr.length
    for(let pair = 1; pair < len; pair *= 2) {
      // 对 [aStart, bStart-1] 和 [bStart, Math.min(bEnd, len-1)] 2车节进行 两两配对排序
      let aStart = 0, bStart = aStart + pair
      // S1 只有还存在 b车节头结点时，此时才有可能 再需要进行[a,b]车节排序，否则b车节不存在直接返回即可
      while (bStart < len) {
        // S2 只有 a车节的最后1个成员值 > b车节的第1个成员值时，才需要对a,b车节进行排序
        // S2 否则就是说明 a,b车节已经是有序的，不需要多余的 排序操作
        if (this.arr[bStart - 1] > this.arr[bStart]) {
          const bEnd = bStart + pair - 1
          // S3 易错点，注意此时b车节的数量有可能不足pair个，所以需要取 bEnd和len-1的最小值
          this.merge(aStart, bStart - 1, Math.min(bEnd, len - 1))
        }

        // 更新a、b车节的 头指针位置
        aStart += pair * 2
        bStart = aStart + pair

      }
    }
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
