/*

峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 nums，找到峰值元素并返回其索引。
数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。

你可以假设 nums[-1] = nums[n] = -∞ 。
你必须实现时间复杂度为 O(log n) 的算法来解决此问题。


示例 1：
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。


示例 2：
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5 
解释：你的函数可以返回索引 1，其峰值元素为 2；
或者返回索引 5， 其峰值元素为 6。
 

提示：
  - 1 <= nums.length <= 1000
  - 231 <= nums[i] <= 231 - 1
  - 对于所有有效的 i 都有 nums[i] != nums[i + 1]

*/

export {};

/**



*/

function findPeakElement(nums: number[]): number {
  // 易错点1：
  // 理论上：按开区间语义，r应该设置为len
  // 实际上：因为本题需要和 nums[mid+1]进行比较，必须保证mid+1不越界
  // 所以 本题妥协方案：设置 r = len - 1，虽然破坏了开区间的完美语义，但避免了越界
  const len = nums.length;
  let l = -1,
    r = len - 1;
  while (l + 1 < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] < nums[mid + 1]) {
      l = mid;
    } else {
      // 此时 nums[mid] 必然> nums[mid + 1]，峰值范围一定在[0, mid]之间
      // 因为 题目保证了 nums[i] != nums[i + 1]
      r = mid;
    }
  }
  return r;
}
