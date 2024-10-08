// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 开始位置， 结束位置

// 二分法的本质：二段性，即一组数据在 可以在某个区间A内满足条件，在非A区间内就不满足

// 开始位置--> 第一个等于target的值-->  即 >=target区间A 的第一个元素
// 结束位置--> 最后一个等于target的值--> 即 <=target区间A内 的最后一个元素

function searchRange(nums, target) {
  let res = [-1, -1];
  if (nums.length === 0) return res;

  // 获取 第一个等于target的值
  let l1 = 0, r1 = nums.length;
  while (l1 < r1) {
    const mid = (l1 + r1) >> 1;
    // 此时中点值是>=target的，我们需要这部分的最左侧元素，所以截去右侧 部分
    if (nums[mid] >= target) {
      r1 = mid;
    } else {
      // 此时中点值是<target的，我们不需要<target的部分，所以截去左侧 小于的部分
      l1 = mid + 1;
    }
  }

  // 获取 最后一个等于target的值
  let l2 = 0, r2 = nums.length;
  while (l2 < r2) {
    // 易错点: 这里当 nums[mid] <= target且l2 = mid，来截去左侧部分时
    // mid应该是 (l2 + r2 + 1) >>1, 而不是 (l2 + r2) >>1
    // 考虑 [1,1], target = 1的 情况
    // 此时如果是(l2 + r2) >>1，那么 l2 = mid = 0
    // 会导致l2一直是0，从而导致死循环

    // 所以，只要截去左侧的操作是通过l = mid，而不是mid + 1来实现时
    // mid取值就要向上取整
    const mid = (l2 + r2 + 1) >> 1;
    // 此时中点值是<=target的，我们需要这部分的最右侧元素，所以截去左侧 部分
    if (nums[mid] <= target) {
      l2 = mid;
    } else {
      // 此时中点值是>target的，我们不需要>target的部分，所以截去右侧 大于的部分
      r2 = mid - 1;
    }
  }

  // 易错点2: 最后要看r1/r2位置的值 是否等于target，要考虑数组里不存在target的情况
  res[0] = nums[r1] === target ? r1 : -1;
  res[1] = nums[r2] === target ? r2 : -1;
  return res;
}


const res = searchRange([5,7,7,8,8,10], 6)
console.log('rr', res)