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

function findBestValue(arr: number[], target: number): number {
  // 预处理：排序 + 构造前缀和数组
  arr.sort((a, b) => a - b)
  const prefixSums= arr.reduce((acc, cur) => {
    return [...acc, (acc.at(-1) || 0) + cur]
  }, [0])
 
  // 进行二分查找：获取target的猜测范围 + 获取sum(val) + 找到 sum(val)<= target的 最大val
  // 双开区间实现 不变量含义：l和r都是已处理过的值
  // 右边界是数组最大值，因为 val > max(arr) 时 calSum 不再变化
  let l = 0, r = arr.at(-1) + 1
  while (l + 1 < r) {
    const val = (l + r) >> 1
    calSum(val) <= target ? l = val : r = val
  }
  // 由于要找到和 target最接近的sum，左侧<= taget 和 右侧 > target，不能保证abs那个更短
  // 所以需要 通过abs比较，确认是 左边还是右边 更接近target
  const diff1 = Math.abs(target - calSum(l))
  const diff2 = Math.abs(target - calSum(r))
  return diff1 <= diff2 ? l : r

  // 辅助函数
  function calSum(val: number): number {
    // getIdx: 找到最后一个 <= val 的索引， 即 <= val的 最大值所在idx
    let l = -1, r = arr.length
    while (l + 1 < r) {
      let mid = (l + r) >> 1
      arr[mid] <= val ? l = mid : r = mid
    }
    let idx = l
    // 易错点
    // prefixSums[i] 是前 i 个数的和（索引 0 到 i-1）
    // 索引 0 到 idx 的数都 <= val，它们的和是 prefixSums[idx + 1]
    // 索引 idx+1 到 arr.length-1 的数都 > val，都要变成 val
    return prefixSums[idx + 1] + (arr.length - idx - 1) * val
  }
}
