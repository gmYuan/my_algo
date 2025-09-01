function searchRange(nums: number[], target: number): number[] {
  const lt = minGt(nums, target);
  // 易错点1: 如果lt 超出范围，或者lt 不等于target，说明不存在
  if (lt === nums.length || nums[lt] !== target) return [-1, -1];
  // <=t的最大值 (maxLt)相当于 minGt(t+1) - 1
  const gt = minGt(nums, target + 1) - 1;
  return [lt, gt];
}

// minGt： >=t的最小值- 左闭右闭区间实现
function minGt(nums: number[], target: number): number {
  // 表示 未处理的元素- 包括l; 包括r
  let l = 0, r = nums.length -1 ;
  // 包括l，包括r, 所有l === r时(如 [4,4]时)，说明还有元素需要处理
  // 所以循环条件是 l <= r
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  // 此时返回l或者r+1，就是 >=t的最小值
  return l;
}
