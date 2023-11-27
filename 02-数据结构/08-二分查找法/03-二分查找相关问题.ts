/**
 * 二分查找法:
 * 
 * 实现思路: 数组有序 + mid二分
 * 
 * 时间复杂度: O(logn)
 * 
**/


// 二分查找1- 递归实现
class binarySearch {
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

  // 相关问题1: 在有序数组中查找 大于target值的最小值索引
  upper(target) {
    this.target = target
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
}

const temp = [1,1,2,3,5,9];
let res = new binarySearch(temp).search(3);
console.log('res', res)
