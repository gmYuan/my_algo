/*

题目描述
给定一个包含 n 个整数的数组nums，
找到最大平均值的连续子序列，且长度大于等于 k。
并输出这个最大平均值。


提示
  - 1 <= k <= n <= 10,000
  - 数组nums中的元素范围是 [-10,000, 10,000]
  - 答案的计算误差小于 10^-5

*/

export {};

/*
*/

function findMaxAverage(nums: number[], k: number): number {
  // 可能的平均值的 最小值和最大值
  let l = Math.min(...nums) - 1, r = Math.max(...nums) + 1;
  // 精度需要保证在 10^-5 以内
  while (r - l > 1e-5) {
    const mid = (l + r) / 2;
    if (check(nums, k, mid)) l = mid;
    else r = mid;
  }
  // 或者返回r，因为此时l和r非常接近
  return r;
}

function check(nums: number[], k: number, x: number): boolean {
  const n = nums.length;
  const sums = new Array(n + 1).fill(0);
  // 前缀和： 计算每个子数组的和, x为 此次猜测的平均值
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + (nums[i] - x);
  }
  // min：从开始到当前位置i之前，所有可能作为起点位置的 前缀和的最小值
  let min = 0;
  for (let i = k; i <= n; i++) {
    //  sums[i] - min >= 0 表示找到了一个平均值大于x的子数组
    if (sums[i] - min >= 0) return true;

    // 更新min，从而找到左端点的最小值，从而让 区间和尽可能大
    // 要找：sums[i] - sums[j] > 0
    // 其中j的范围是：[0, i-k+1]（保证长度≥k）
    // 等价于：sums[i] - min(sums[0...i-k+1]) > 0
    // 这就是为什么我们需要维护min
    min = Math.min(min, sums[i - k + 1]);
  }

  return false;
}
