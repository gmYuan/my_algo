// 二分查找：
//   1. 有明确的 搜索范围
//   2. 搜索范围内成员 满足单调性==> 最值问题
//   3. 通过【二分查找】不断缩减搜索范围， 最终确定答案

function minEatingSpeed(piles, h) {
  let l = 1, r = Math.max(...piles);
  while (l < r) {
    let mid = l + ((r - l) >> 1);
    const usedTime = getTime(piles, mid);
    if (usedTime <= h) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function getTime(piles, speed) {
  return piles.reduce((acc, cur) => acc + Math.ceil(cur / speed), 0);
}
