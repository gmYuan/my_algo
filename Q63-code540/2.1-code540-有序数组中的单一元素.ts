/*

给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，
唯有一个数只会出现一次。
请你找出并返回只出现一次的那个数。

你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。

 
示例 1:
输入: nums = [1,1,2,3,3,4,4,8,8]
输出: 2


示例 2:
输入: nums =  [3,3,7,7,10,11,11]
输出: 10
 

提示:
1 <= nums.length <= 105
0 <= nums[i] <= 105

*/

export {};

/*

*/

function singleNonDuplicate(nums: number[]): number {
  return findM(nums, 2)
}

// 在以m个元素进行重复的 有序数组nums里，找到唯一的 无重复的 元素
function findM(nums: number[], m: number): number {
  let l = -1, r = ~~((nums.length + 1) / m)
  while (l + 1 < r) {
    const mid = (l + r) >> 1
    if (nums[mid * m] !== nums[mid * m + 1]) {
      r = mid
    } else {
      l = mid
    }
  }
  return nums[r * m]
}