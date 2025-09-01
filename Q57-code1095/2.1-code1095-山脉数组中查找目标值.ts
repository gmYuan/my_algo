/*

你可以将一个数组 arr 称为 山脉数组 当且仅当：
  - arr.length >= 3
  - 存在一些 0 < i < arr.length - 1 的 i 使得：
    - arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

给定一个山脉数组 mountainArr ，返回 最小 的 index 
使得 mountainArr.get(index) == target。
如果不存在这样的 index，返回 -1 。

你无法直接访问山脉数组。你只能使用 MountainArray 接口来访问数组：
  - MountainArray.get(k) 返回数组中下标为 k 的元素（从 0 开始）。
  - MountainArray.length() 返回数组的长度。
  - 调用 MountainArray.get 超过 100 次的提交会被判定为错误答案。
  - 此外，任何试图绕过在线评测的解决方案都将导致取消资格。


示例 1：
输入：mountainArr = [1,2,3,4,5,3,1], target = 3
输出：2
解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。

示例 2：
输入：mountainArr = [0,1,2,4,2,1], target = 3
输出：-1
解释：3 在数组中没有出现，返回 -1。
 

提示：
  - 3 <= mountainArr.length() <= 104
  - 0 <= target <= 109
  - 0 <= mountainArr.get(index) <= 109
*/

/*



 */

export {};

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *      get(index: number): number {}
 *
 *      length(): number {}
 * }
 */

interface MountainArray {
  get(index: number): number;
  length(): number;
}

function findInMountainArray(target: number, arr: MountainArray): number {
  const len = arr.length();
  // 找峰值：第一个比后面元素大的位置
  const peak = quickFind(-1, len, (i) => arr.get(i) >= arr.get(i + 1));
  // 如果峰值就是target，直接返回
  if (arr.get(peak) === target) return peak;

  // 左侧查找：第一个大于等于target的位置
  const i = quickFind(-1, peak, (i) => arr.get(i) >= target);
  if (arr.get(i) === target) return i;

  // 右侧查找：第一个小于等于target的位置
  const j =
    peak + quickFind(-1, len - peak, (i) => arr.get(peak + i) <= target);

  return arr.get(j) === target ? j : -1;
}

// 辅助函数：找到第一个满足条件的位置
function quickFind(
  l: number,
  r: number,
  condition: (i: number) => boolean
): number {
  while (l + 1 < r) {
    const mid = (l + r) >> 1;
    if (condition(mid)) {
      r = mid;
    } else {
      l = mid;
    }
  }
  return r;
}
