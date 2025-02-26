// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]

// 要求: 原地排序

function sortColors(nums) {
  // [0, p0] === 0; [p0+1, i/p1) === 1; [p2, len-1] === 2
  let p0 = -1, p2 = nums.length, i = 0;
  while (i < p2) {
    if (nums[i] === 0) {
      swap(nums, ++p0, i++);
    } else if (nums[i] === 1) {
      i++;
    } else {
      swap(nums, --p2, i);
    }
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
