/*
给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致
（如果出现次数不一致，则考虑取较小值）。
可以不考虑输出结果的顺序。

 
示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]

示例 2:
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]

*/

function intersect(nums1: number[], nums2: number[]): number[] {
  // 优化点： 先判断两个数组的长度，将较短的数组作为l1，较长的数组作为l2
  const [l1, l2] =
    nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
  // 易错点1： 由于Map的key是Set，所以需要累增计数，而不能每个key都设置为1
  const saved = new Map();
  const res = [];
  l1.map((val) => saved.set(val, (saved.get(val) ?? 0) + 1));
  for (const val of l2) {
    const pre = saved.get(val);
    if (pre) {
      res.push(val);
      saved.set(val, pre - 1);
    }
  }
  return res;
}
