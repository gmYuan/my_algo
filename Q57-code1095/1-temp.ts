interface MountainArray {
  get(index: number): number;
  length(): number;
}

function findInMountainArray(target: number, arr: MountainArray): number {
  const len = arr.length();
  // 找峰值：第一个非递增的分割点
  const pdx = quickFind(-1, len, (i) => arr.get(i) > arr.get(i + 1));
  if (arr.get(pdx) === target) return pdx;

  // >=t的最小值（左侧升序部分）
  const ldx = quickFind(-1, pdx, (i) => arr.get(i) >= target);
  if (arr.get(ldx) === target) return ldx;

  // <=t的最大值（右侧降序部分）
  // 易错点1：如果这里是>=t，会导致错误的更新r边界，而不是更新l边界
  // 易错点2: 最后的返回值需要加上pdx的偏移量
  const rdx = pdx + quickFind(-1, len - pdx, (i) => arr.get(pdx + i) <= target);
  return arr.get(rdx) === target ? rdx : -1;
}

function quickFind(l: number, r: number, condition: (i: number) => boolean) {
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    if (condition(mid)) {
      r = mid;
    } else {
      l = mid;
    }
  }
  return r;
}
