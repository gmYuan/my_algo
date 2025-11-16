/*

给你一个整数数组 arr 和一个目标值 target ，
请你返回一个整数 value ，
使得将数组中所有大于 value 的值变成 value 后，
数组的和最接近 target （最接近表示两者之差的绝对值最小）。

如果有多种使得和最接近 target 的方案，请你返回这些整数中的最小值。
请注意，答案不一定是 arr 中的数字。


示例 1：
输入：arr = [4,9,3], target = 10
输出：3
解释：当选择 value 为 3 时，数组会变成 [3, 3, 3]，和为 9 ，这是最接近 target 的方案。


示例 2：
输入：arr = [2,3,5], target = 10
输出：5


示例 3：
输入：arr = [60864,25176,27249,21296,20204], target = 56803
输出：11361
 

提示：
1 <= arr.length <= 10^4
1 <= arr[i], target <= 10^5

*/

export {};

/*

1 思路分析

1.1 理解题目：
  - 有一个数组 arr 和目标值 target
  - 找一个数 value
  - 把数组中所有大于 value 的数都改成 value
  - 让新数组的和尽可能接近 target

1.2.1 最简单直接的思路，即 暴力解法
  - 题目要求找出一个 value，那就尝试所有可能的 value，看哪个最接近
  - value 的范围是多少？
    - 太小（如负数）：没有意义，数组保持不变
    - 太大（超过数组里的 max）：数组不变，继续增大也没用
    - 结论：value 的范围是 [0, max(arr)]

1.2.2 具体过程
  - 从 value = 0 开始，到 value = max(arr)
  - 对每个 value：  
      - 遍历数组，计算新数组的和
      - 计算这个和与 target 的差值
      - 记录最小差值， 如果差值相同，取较小的value
  
  - 优化点：如果当前value的sum已经大于target了，后面的value只会让差值更大，所以可以提前结束
  - 时间复杂度：O(maxNum * n)
  - 空间复杂度：O(1)


1.2.3 观察规律
  - 随着 value 增大，sum 也会越来越大==> 单调性
    - x < val时，会保持不变
    - x >= val时，会变成 val
    - val 是依次递增的
    - 所以 sum(value) 必然也是依次递增的
  
  - sum(val) 单调递增，意味着
    - 如果 sum < target，继续增大 val 可能更接近 target
    - 如果 sum > target，继续增大 val 只会更远，所以可以提前结束


1.3.1 方法1- 二分查找思路
  - 在 [0, maxNum] 中找 val
  - 用二分找到一个位置，使得 sum(val) <= target 且 sum(val+1) > target
  - 最优解就在 val 和 val+1 之间
  - 即：找到最大的 val，使得 sum(val) <= target && sum(val+1) > target
  - 时间复杂度：O(n * log(maxNum))
  - 空间复杂度：O(1)


*/

function findBestValue(arr: number[], target: number): number {
  const max = Math.max(...arr);
  let l = -1, r = max + 1;
  // 双开区间：[-Infinity, l] 无限趋近于 <= target;  [r, Infinity] 无限趋近于 > target
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    // 易错点1： 这里mid就是val值，而不是索引
    const sum = calSum(arr, mid);
    sum <= target ? (l = mid) : (r = mid);
  }

  //易错点2： sum 可能小于 target，所以 需要比较绝对值
  const disL = Math.abs(calSum(arr, l) - target);
  const disR = Math.abs(calSum(arr, r) - target);
  return disL <= disR ? l : r; 
}

function calSum(arr: number[], val: number) {
  return arr.reduce((acc, cur) => {
    return acc + Math.min(cur, val);
  }, 0);
}
