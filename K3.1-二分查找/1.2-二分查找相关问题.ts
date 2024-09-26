/**
 * 二分查找法:
 * 
 * 实现思路: 数组有序 + mid二分
 * 
**/


// 二分查找1- 递归实现
class binarySearch3 {
  data: number[];
  target: number;
  constructor(arr) {
    this.data = arr;
  }

  search(target) {
    this.target = target
    return this.innerSearch(0, this.data.length - 1);
  }

  innerSearch(left, right) {
    if (left > right) return -1;
    const mid = left + Math.floor((right - left) / 2)
    const curVal = this.data[mid], target = this.target
    if (curVal === target) return mid;
    if (curVal < target) {
      return this.innerSearch(mid + 1, right)
    }
    return this.innerSearch(left, mid - 1)
  }

  // 相关问题1: 在有序数组中查找 大于target值的 最小值索引
  upper(target) {
    // 在 data[l, r]范围内 寻找解
    let l = 0, r = this.data.length
    while (l < r) {
      let mid = l + ((r - l) >> 1)
      if (this.data[mid] <= target) {
        l = mid + 1
      } else {
        // 此时说明data[mid]大于target值，由于要查找大于target的最小值，所以去掉右半段
        r = mid
      }
    }
    // 运行到此说明l===r了，说明找到了大于target的最小值，直接返回索引即可
    return l
  }

   // 相关问题2: ceil: 
   //   数组内成员值都 >target时，返回 >target的 最小值的 索引
   //   数组内有成员值 ===target时，返回 ===target的 最大索引
   ceil(target) {
    const upperIdx = this.upper(target)
    // 此时upperIdx为 >target值的 最小值索引，只要看其前一位是不是等于target即可
    if (upperIdx - 1 >= 0 && this.data[upperIdx-1] === target) {
      return upperIdx - 1
    }
    return upperIdx
  }
}

const temp3 = [1,1,2,3,5,9];
let res3 = new binarySearch3(temp3).search(3);
console.log('res3', res3)
