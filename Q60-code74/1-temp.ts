var solution = function (isBadVersion: any) {
  return function (n: number): number {
    // 左闭：不可确认分段；右开：可确认分段
    // 循环不变量含义：check(l-1)属于分段false; check(r)属于分段true
    let l = 1, r = n + 1;
    while (l < r) {
      const mid = l + ((r - l) >> 1);
      if (isBadVersion(mid)) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return r;
  };
};
