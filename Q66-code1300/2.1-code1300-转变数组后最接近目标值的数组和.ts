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
  // 1 预处理阶段
  // 1.1 排序arr: 为了 能快速找到 >= val元素的 位置
  arr.sort((a, b) => a - b);
  // 1.2 计算前缀和数组: 为了 能快速计算 前idx个元素的和
  const prefixSum = arr.reduce((acc, cur) => {
    return [...acc, acc.at(-1) + cur];
  }, [0]);
  
  // err: 根据val，二分查找到val 在arr里 对应的idx
  // correct: 找到第一个 >= val 的位置
  // todo 为什么?
  const getIdx = (val: number) => {
    let l = -1, r = arr.length;
    // 满足[-Infinity, l] < val,  [r, Infinity] >= val
    while (l + 1 < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] < val) l = mid + 1;
      else r = mid - 1;
    }
    return r;
  };

  // 计算某个idx的所有和，其中idx之前的取prefixSum[idx], idx之后的取 val * (len - idx)
  const getSum = (val: number) => {
    const idx = getIdx(val);
    // todo 这里为什么不是 prefixSum[idx + 1] + val * (arr.length - idx) 呢
    return prefixSum[idx] + val * (arr.length - idx) 
  };

  // 对可能的val进行二分查找，其范围是(-1, arr.at(-1) + 1)
  let l = -1, r = (arr.at(-1) || 100000) + 1;
  let res = 0, diff = Number.MAX_VALUE;
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    const sum = getSum(mid);
    if (sum < target) r = mid - 1
    else l = mid + 1
    if (Math.abs(sum - target) <= diff) {
      res = Math.min(res, mid)
    }
  }
  return res
}
