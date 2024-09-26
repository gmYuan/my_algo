/**
 * 二分查找法:
 * 
 * 实现思路: 数组有序 + mid二分
 * 
**/


// 二分查找1- 递归实现
class binarySearch {
  data: number[];
  target: number;
  constructor(arr, target) {
    this.data = arr;
    this.target = target
  }

  search() {
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
}

// 二分查找2- 非递归实现
class binarySearch2 {
  data: number[];
  target: number;
  constructor(arr, target) {
    this.data = arr;
    this.target = target
  }

  search() {
    let left = 0, right = this.data.length - 1
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)
      const curVal = this.data[mid], target = this.target
      if (curVal === target) return mid;
      if (curVal < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    } 
    return -1 
  }
}


const temp = [1,1,2,3,5,9];
let res = new binarySearch(temp, 3).search();
console.log('res', res)
