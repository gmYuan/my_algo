/**

1.1 题意转化：求2个有序数组的中位数 ==> 
  - 分别在数组 num1 和 num2里，各自找到1个切分点，使其满足已下中位数性质
    - 性质1：左右区间 总成员数量大致相等
    - 性质2：左区间最大值 <= 右区间最小值


1.2 性质1 抽象为数学表达
  - A的数量为m, B的数量为n，则总成员个数是 m+n
  - 把 num1 拆分成的 2个区间，分别记作 L1、R1
  - 把 num2 拆分成的 2个区间，分别记作 L2、R2
  - 则 L = L1 + L2, R = R1 + R2
  
  - 如果 m+n 是偶数，则 L.length = L1.length + L2.length = (m+n)/2, 注意 本文所有 / 都理解为底板除
  - 如果 m+n 是奇数，则 L.length = L1.length + L2.length = (m+n+1)/2
  - 无论 m+n 是奇数还是偶数，都可以统一表示为 L.length = (m+n+1)/2
  - 即 无论 m+n 是奇数还是偶数，+1后的地板除的结果，对于L的值 都是正确的


1.3 性质2 抽象为数学表达
  - 把 num1 的左区间的最大值，记作maxL1；num1的右区间的最小值，记作minR1
  - 把 num2 的左区间的最大值，记作maxL2；num2的右区间的最小值，记作minR2
  - 如果满足 maxL1 <= minR1, maxL2 <= minR2 且 maxL1 <= minR2, maxL2 <= minR1，则 max(L) <= min(R) 成立
  - 这里默认 maxL1/maxL2/minR1/minR2 都存在，不存在的边界情况后续会 特殊处理

  - 把 max(maxL1, maxL2) 记作 maxL, min(minR1, minR2) 记作 minR
  - 此时，如果 m+n 是偶数，则 中位数的值res = (maxL + minR) / 2
  - 如果 m+n 是奇数，则 中位数的值res = maxL


2 确定 i 和 j 的 取值关系
  - i/j 表示的是 L1/L2里各自的 成员个数
  - 又因为 L.length = L1 + L2 =  (m+n+1)/2
  - 所以 i + j = (m+n+1)/2, 即 j = (m+n+1)/2 - i
  - 即 i 和 j 是 反向关系，i 越大，j 越小
  - 这里需要保证 i是 相对 m/n里的 较小值，原因是：
    - 假设 m < n, 如果 i 的 取值范围是[0, n]
    - 因为 j = (m+n+1)/2 - i, 所以 j 的取值范围是[(m+n+1)/2 - n, (m+n+1)/2 - 0]
    - 如果m极小，则 (m+n+1)/2 - n 趋向于 (n+1)/2 -n, 大概率越界

    - 假设 m < n, 如果 i 的 取值范围是[0, m]
    - 因为 j = (m+n+1)/2 - i, 所以 j 的取值范围是[(m+n+1)/2 - m, (m+n+1)/2 - 0]
    - 如果m极小，则 (m+n+1)/2 - m 保证不会越界
  
  - 综上，j = (m+n+1)/2 - i
  - i是 相对 m/n里的 较小值，这样能同时保证 L1/L2 的 取值范围不会越界



3 确定 二分查找 缩放逻辑
  - 由于 num1/num2 都是有序递增的，所以默认情况下，就满足一下性质
    - maxL1 = num1[i-1], minR1 = num1[i], 且 maxL1 <= minR1
    - 同理 maxL2 = num2[j-1], minR2 = num2[j], 且 maxL2 <= minR2

  - 如果 maxL1 > minR2, 说明
    - maxL1应该属于 R1区间, 即 i 需要减少/左移
    - 而 i 减少/左移，又会让 j 对应增大/右移
    - 这样就能同时实现 maxL1变小，minR2变大
    - 由于我们是统一处理i的，所以此时 让i变小即可

  - 如果 maxL2 > minR1, 说明
    - maxL2应该属于 R2区间, 即 j 需要减少/左移
    - 而 j 减少/左移，又会让 i 对应增大/右移
    - 这样就能同时实现 maxL2变小，minR1变大
    - 由于我们是统一处理i的，所以此时 让i变大即可

*/


function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  // 保证 nums1 是 较短的数组
  const m = nums1.length
  const n = nums2.length
  // 保证 i 的较小长度的数组，确保i/j的 取值范围不会越界
  let l = 0, r = m
  while (l <= r) {
    let i = (l + r + 1) / 2
    let j = (m + n + 1) / 2 - i
    
    
  }
  
  
};