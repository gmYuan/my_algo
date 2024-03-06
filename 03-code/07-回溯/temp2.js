// code  39-67-n

// ltcode地址
// https://leetcode.cn/problems/combination-sum/description/

// 参考地址
// https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0039-Combination-Sum/cpp-0039/main.cpp

function combinationSum(candidates, target) {
  let res = [], curRes = [];
  candidates.sort((a, b) => a - b);
  dfs(candidates, target, res, curRes, 0);
  return res;
}

function dfs(arr, target, res, curRes, start) {
  if (target === 0) {
    res.push([...curRes]);
    return;
  }
  // 剪枝1：从 start 开始遍历，避免生成重复子集
  for (let i = start; i < arr.length; i++) {
    // 剪枝2：若子集和 超过target ，则直接结束循环
    // 因为数组已排序，后边元素更大，子集和一定超过 target
    if (target - arr[i] < 0) {
      break;
    }
    curRes.push(arr[i]);
    dfs(arr, target - arr[i], res, curRes, i);
    curRes.pop();
  }
}

const res = combinationSum([2, 3, 5], 8);
console.log("rr", res);
