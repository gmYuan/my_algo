/*

给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。
请你找出给定目标值在数组中的 开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。


示例 1：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]


示例 2：
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

示例 3：
输入：nums = [], target = 0
输出：[-1,-1]


提示：
0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums 是一个非递减数组
-109 <= target <= 109

*/

export {};

function searchRange(nums: number[], target: number): number[] {
  const lt = minGt(nums, target);
  // 易错点1: 如果lt 超出范围，或者lt 不等于target，说明不存在
  if (lt === nums.length || nums[lt] !== target) return [-1, -1];
  // <=t的最大值 (maxLt)相当于 minGt(t+1) - 1
  const gt = minGt(nums, target + 1) - 1;
  return [lt, gt];
}

// 获取 >=t的 最小值- 左开右开实现
function minGt(nums: number[], target: number): number {
  // 左右都是开区间，表示 未处理的元素- 不包括l; 不包括r
  // 及 未处理的元素，不包括-1 和 len
  // 即 [-Infinity, -1]都 < t, [len, Infinity]都 >= t

  // ps1: 如果是左闭右开，表示未处理的元素- 包括l; 不包括r
  // ps2: 如果是左闭右闭，表示未处理的元素- 包括l; 包括r
  let l = -1,
    r = nums.length;
  // 如果l + 1 === r，说明此时l和r都被处理过了，此时区间内没有待处理元素
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    if (nums[mid] < target) {
      l = mid;
    } else {
      r = mid;
    }
  }
  // 到此时，l必然是 < t的最后一个元素，r必然是 >= t的第1个元素
  return r;
}
