
// 一维数组 前缀和
// 给出一个数组，求出该数组中 任意区间[l, r] 的和
// 其中 r >= l >= 1

function PrefixSum(arr, [l, r]) {
  let sums = [0]
  // 计算前缀和
  for (let i = 1; i < arr.length; i++) {
    sums[i] = arr[i - 1] + sums[i - 1]
  }
  // 计算区间和
  return sums[r] - sums[l - 1]
}

// 注意 l 需要 >= 1, 即下标是从 1开始的
console.log(PrefixSum([1,2,3,4,5], [1, 4]))