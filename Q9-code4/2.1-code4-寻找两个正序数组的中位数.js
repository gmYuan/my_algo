/** 
 * 
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
算法的时间复杂度应该为 O(log (m+n)) 。

示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2


示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
*/


function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 确保 nums1 的长度小于等于 nums2 的长度
  // 这样可以保证在较短的数组上进行二分查找，避免越界
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const N1 = nums1.length;
  const N2 = nums2.length;
  
  // 在较短数组的虚拟数组上 进行二分查找
  // 虚拟数组 是在原数组每个元素之间插入 # 后的数组
  // 例如 [1,2] -> [#,1,#,2,#]
  // lo和hi表示虚拟数组的切分点范围
  let lo = 0, hi = 2 * N1;
  
  while (lo <= hi) {
    // C1 是较短数组虚拟数组的切分点
    const C1 = Math.floor((lo + hi) / 2);
    // C2 是较长数组虚拟数组的切分点
    // 根据 C1 + C2 = N1 + N2 计算得出，确保两边元素个数相等
    const C2 = N1 + N2 - C1;
      
    // L1 是较短数组切分点左边的值
    // 当 C1=0 时，表示切分点在最左边，左边没有元素，用-Infinity表示
    const L1 = C1 === 0 ? -Infinity : nums1[Math.floor((C1-1)/2)];
    // R1 是较短数组切分点右边的值
    // 当 C1=2*N1 时，表示切分点在最右边，右边没有元素，用Infinity表示
    const R1 = C1 === 2*N1 ? Infinity : nums1[Math.floor(C1/2)];
      
    // L2 是较长数组切分点左边的值
    const L2 = C2 === 0 ? -Infinity : nums2[Math.floor((C2-1)/2)];
    // R2 是较长数组切分点右边的值
    const R2 = C2 === 2*N2 ? Infinity : nums2[Math.floor(C2/2)];
      
    // 如果 L1 > R2，说明较短数组的左半部分太大
    // 需要把切分点左移（减小C1，相应地C2会增大）
      if (L1 > R2) {
        hi = C1 - 1;
      } 
    // 如果 L2 > R1，说明较长数组的左半部分太大
    // 需要把切分点右移（增大C1，相应地C2会减小）
    else if (L2 > R1) {
      lo = C1 + 1;
    } 
    // 找到合适的切分点，满足 L1 <= R2 且 L2 <= R1
    // 中位数就是左半部分的最大值和右半部分的最小值的平均数
    else {
      return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
     }
  }
};