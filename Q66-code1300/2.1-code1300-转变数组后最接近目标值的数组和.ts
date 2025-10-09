/*

给你一个整数数组 arr 和一个目标值 target ，
请你返回一个整数 value ，
使得将数组中所有大于 value 的值变成 value 后，
数组的和最接近  target （最接近表示两者之差的绝对值最小）。

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

解法1：暴力解法
  - 从0开始，一直 遍历到数组的max (再大的话 数组还是会保持原状，没有意义)
  - 计算每个value下的数组和
  - 计算与target的差值
  - 记录最小差值
  - 如果差值相同，取较小的value
  - 优化点：如果当前value的sum已经大于target了，后面的value只会让差值更大，所以可以提前结束
  - 时间复杂度：O(maxNum * n)
  - 空间复杂度：O(1)


从暴力解法，可以观察出
  - value越大，数组和 就会越大


todo

二分查找：通用但复杂
数学解法：优雅但不直观
平均值解法：简单且高效
*/

function findBestValue(arr: number[], target: number): number {
  // 1. 找到数组最大值
  const maxNum = Math.max(...arr);
  
  // 2. 遍历所有可能的value值
  let minDiff = Infinity;  // 记录最小差值
  let result = 0;         // 记录最优value
  
  // value的范围是[0, maxNum]
  for (let value = 0; value <= maxNum; value++) {
      // 计算当前value下的数组和
      let sum = 0;
      for (const num of arr) {
          sum += num > value ? value : num;
      }
      
      // 计算与target的差值
      const diff = Math.abs(sum - target);
      
      // 更新最优解
      if (diff < minDiff) {
          minDiff = diff;
          result = value;
      } else if (diff === minDiff) {
          // 如果差值相同，取较小的value
          result = Math.min(result, value);
      }
      
      // 优化：如果sum已经大于target，后面的value只会让差值更大
      if (sum > target) break;
  }
  
  return result;
}