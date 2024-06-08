function quickSortV2_2(nums: number[]): number[] {
  innerSort(nums, 0, nums.length - 1);
  return nums
};

function innerSort(arr, l, r) {
  if (l >= r) return;
  const p = partition(arr, l, r)
  innerSort(arr, l, p);
  innerSort(arr, p + 1, r)
}

// 获取x的正确位置p，使 arr[l, p]都<=x, arr[p+1, r]都>=x
function partition(arr, l, r) {
  let rdx = Math.floor(Math.random() * (r-l+1)) + l
  swap(arr, l, rdx)
  let x = arr[l], i = l, j = r
  // 保证 [l, i-1]都<=x, [j+1,r]都>=x
  while (1) {
    while (arr[i] < x) i++;
    while (arr[j] > x) j--;
    if (i >= j) break;
    swap(arr, i, j);
    i++; j--;
  }
  return j
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}