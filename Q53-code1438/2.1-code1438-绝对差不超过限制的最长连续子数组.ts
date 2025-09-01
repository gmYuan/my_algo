/*
给你一个整数数组 nums ，和一个表示限制的整数 limit，
请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。
如果不存在满足条件的子数组，则返回 0 。

 
示例 1：
输入：nums = [8,2,4,7], limit = 4
输出：2 

解释：所有子数组如下：
[8] 最大绝对差 |8-8| = 0 <= 4.
[8,2] 最大绝对差 |8-2| = 6 > 4. 
[8,2,4] 最大绝对差 |8-2| = 6 > 4.
[8,2,4,7] 最大绝对差 |8-2| = 6 > 4.

[2] 最大绝对差 |2-2| = 0 <= 4.
[2,4] 最大绝对差 |2-4| = 2 <= 4.
[2,4,7] 最大绝对差 |2-7| = 5 > 4.

[4] 最大绝对差 |4-4| = 0 <= 4.
[4,7] 最大绝对差 |4-7| = 3 <= 4.
[7] 最大绝对差 |7-7| = 0 <= 4. 
因此，满足题意的最长子数组的长度为 2 。


示例 2：
输入：nums = [10,1,2,4,7,2], limit = 5
输出：4 

解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。

示例 3：
输入：nums = [4,2,2,2,4,4,2,2], limit = 0
输出：3


提示：
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
0 <= limit <= 10^9

*/

export {};

/*



*/

function longestSubarray(nums: number[], limit: number): number {
  // Map<元素值, 出现次数>: 用于快速获取窗口内的最值
  let count = new Map();
  let left = 0,
    ans = 0;

  // 固定右边界扩展策略，逐步扩大窗口，当窗口不满足条件时再收缩左边界
  nums.forEach((num, right) => {
    count.set(num, (count.get(num) || 0) + 1);
    // 获取窗口内的最值
    const max = Math.max(...count.keys());
    const min = Math.min(...count.keys());
    // 如果窗口内的最值差大于limit，则收缩左边界
    while (max - min > limit) {
      // 获取将要移出窗口的元素, 更新它的出现次数
      const val = nums[left];
      count.set(val, count.get(val) - 1);
      if (count.get(val) === 0) count.delete(val);
      // 收缩左边界
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  });

  return ans;
}
