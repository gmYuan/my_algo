// code  40-37-n

// 参考地址
// https://leetcode.cn/problems/combination-sum-ii/solutions/2363941/40-zu-he-zong-he-iihui-su-qing-xi-tu-jie-7y8s/

function combinationSum2(candidates, target) {
  const res = [], depthRes = [];
  candidates.sort((a, b) => a - b);
  backTrack(candidates, target, res, depthRes, 0);
  return res;
}

function backTrack(arr, target, res, depthRes, start) {
  if (target === 0) {
    res.push([...depthRes]);
    return;
  }
  for (let i = start; i < arr.length; i++) {
    const newTarget = target - arr[i];
    if (newTarget < 0) {
      break;
    }
    if (i > start && arr[i] === arr[i - 1]) {
      continue;
    }
    depthRes.push(arr[i]);
    backTrack(arr, newTarget, res, depthRes, i + 1);
    depthRes.pop();
  }
}

const res2 = combinationSum2([1,2,2,5],5)
console.log(res2)