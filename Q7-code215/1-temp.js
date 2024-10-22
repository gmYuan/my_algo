function findKthLargest(nums: number[], k: number): number {
  let len = nums.length;
  // 第k大，对应的下标为 len - k:
  // 比如第1大，对应的下标为 len-1; 第2大，对应的下标为 len-2 ...
  return quickFind(nums, 0, len - 1, len - k);
}