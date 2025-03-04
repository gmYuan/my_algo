/*

1.1 题意转化：求2个有序数组的中位数 ==> 找到 nums1 和 nums2 总长度m+n里，第k小的数
  - 如果m+n是奇数，则k是 第(m+n)/2个数， 最后 res值 = 第k个数的值
  - 如果m+n是偶数，则k是 v1 = 第(m+n)/2 和 v2 = 第(m+n)/2+1 个数，最后 res值 = (v1 + v2) / 2


2.1 如何找到第k小的数
  - 在 nums1 和 nums2 里，分别找到 第k/2小的数，记为 num1[i] 和 nums2[j]
  - 如果 nums1[i] > nums2[j]，那么num[j]最大的情况下，无非是 
    - nums1[0] <= nums1[1] <= ... <= nums1[i-1] <= nums1[j]，此时 j至多也就是 第 k/2-1 + 2/k，
      也就是 j最多是 第 k-1 小的数，不可能是 第k小的数

  - 同样如果 nums1[i] <= nums2[j]，那么num[i]最大的情况下，无非是 
    - nums2[0] <= nums2[1] <= ... <= nums2[j-1] <= nums1[i]，此时 i至多也就是 第 k/2-1 + 2/k，
      也就是 i最多是 第 k-1 小的数，不可能是 第k小的数

  - 也就是说，通过每次在 nums1 和 nums2 里，通过比较各自 第k/2小的数，就可以排除掉 k/2 个数
  - 一直递归缩小，直到找到第k小的数


*/



function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  
};