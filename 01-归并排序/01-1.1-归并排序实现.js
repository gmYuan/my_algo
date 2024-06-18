function mergeSort(nums: number[]): number[] {
  innerSort(nums, 0, nums.length - 1)
  return nums
};

// 排序 arr里 [l,r]范围内的成员
function innerSort(arr, l, r) {
  // 递归终止条件：拆分到了每组只有1个元素
  if (l >= r) return;
  const mid = (l + r) >> 1;
  // 合并左子区间
  innerSort(arr, l, mid);
  // 合并右子区间
  innerSort(arr, mid + 1, r);

  // 对左右有序区间 进行合并
  // 优化点1: 只有在arr[mid]的值 > arr[mid+1]值的时候，才需要进行merge排序操作
  // 因为对于2个有序区间而言，如果mid值已经小于mid+1了，那么他们整个区间就已经是有序的了
  // 这样优化后，对完全有序的数组，归并排序的复杂度是 0(n)的
  if (arr[mid] > arr[mid+1]) {
    mergePart(arr, l, mid, r);
  }
}


//合并2个有序区间: arr[l, mid] 和 arr[mid+1, r]
function mergePart(arr, l, mid, r) {
  // 拷贝一份原数组，因为后续原数组内容会被更改
  const copy = [...arr];
  // 双指针处理
  let rdx = l, i = l, j = mid + 1;
  while (i <= mid && j <= r) {
    if (copy[i] <= copy[j]) arr[rdx++] = copy[i++];
    else arr[rdx++] = copy[j++];
  }
  // 处理左右侧还剩下的有序内容，直接赋值即可
  while (i <= mid) arr[rdx++] = copy[i++];
  while (j <= r) arr[rdx++] = copy[j++];
}