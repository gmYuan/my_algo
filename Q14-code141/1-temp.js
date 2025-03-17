// 输入格式
// 共一行，包含一个浮点数 n
// −10000≤n≤10000

function cubicRootV1(n) {
  let l = -10000,
    r = 10000;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (curVal === n) return mid;
    if (n > 0 && curVal < n) l = mid + 1;
    if (n > 0 && curVal > n) r = mid - 1;
    if (n < 0 && curVal < n) r = mid - 1;
    if (n < 0 && curVal > n) l = mid - 1;
  }
}

function cubicRoot(n) {
  let l = -10000, r = 10000;
  while (r - l > 1e-8) {
    let mid = (l + r) / 2;
    if (mid * mid * mid <= n) {
      l = mid;
    } else {
      r = mid;
    }
  }
  return l.toFixed(6);
}
