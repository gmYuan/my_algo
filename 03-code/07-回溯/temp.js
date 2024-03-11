// code  216-1-n

// 参考地址

// 找出所有相加之和为n的 k个数的组合
function combinationSum3(k: number, n: number): number[][] {
  let res = [], path = [];
  backTrack(n, k, res, path, 1);
  return res;
}

function backTrack(target, maxDepth, res, path, depthStart) {
  if (maxDepth === 0) {
    if (target === 0) {
      res.push([...path]);
    }
    return;
  }
  for (let i = depthStart; i <= 9; i++) {
    if (i > target) break;
    path.push(i);
    backTrack(target - i, maxDepth - 1, res, path, i + 1);
    path.pop();
  }
}
//                6
// 1          2  ...      9

// 23..9
