/*

整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，
使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。

例如， [0,1,2,4,5,6,7] 向左旋转 3 次后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，
如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

 

示例 1：
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

示例 2：
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

示例 3：
输入：nums = [1], target = 0
输出：-1


提示：
1 <= nums.length <= 5000
-104 <= nums[i] <= 104
nums 中的每个值都 独一无二
题目数据保证 nums 在预先未知的某个下标上进行了旋转
-104 <= target <= 104

*/

/*



 */

export {};

function search(nums: number[], target: number): number {
  // last是天然的l1 和 l2 的 分割点
  // l1的每个值 > l2的每个值
  const last = nums.at(-1);
  let l = -1,
    r = nums.length;
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    const x = nums[mid];
    if (x === target) return mid;
    // 易错点1：需要判断等于last的情况，不然当x或者t正好为last时，会误判断所属区间
    // x属于l2; t属于l1
    if (x <= last && target > last) {
      r = mid;
    } else if (x > last && target <= last) {
      // x属于l1; t属于l2
      l = mid;
    } else {
      // x 和 taget 属于同一段，比较这2个值进行二分即可
      x < target ? (l = mid) : (r = mid);
    }
  }
  return -1;
}
