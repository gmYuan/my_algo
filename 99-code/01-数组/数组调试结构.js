
// code215
function findKthLargest(nums, k) {
  // 易错点1: 理解题意，第k大的元素，升序表示时的下标必然是len-k
  const kdx = nums.length - k
  return quickFind(nums, 0, nums.length -1, kdx)
};

function quickFind(arr, l, r, kdx) {
  // 这句话也可能不写，但是运行到l===r时，经过拆分必然是l===r===kdx的情况，所以提前返回即可
  if(l === r) return arr[l];
  const p = partition(arr, l, r)
  if (p === kdx) return arr[p];
  if (p < kdx) {
    return quickFind(arr, p+1, r, kdx)
  } else {
    return quickFind(arr, l, p-1, kdx)
  }
}

function partition(arr, l, r) {
  const rdx = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l, rdx)
  // 易错点2: 保证性质: [l+1, i)都<=x, (j, r]都>=x
  let x = arr[l], i = l + 1, j = r
  while (1) {
    while (arr[i] < x) i++;
    while (arr[j] > x) j--;
    if (i >= j) break;
    swap(arr, i++, j--);
  }
  // 到此时必然满足 [l+1, i)都<=x, (j, r]都>=x， 且 此时i === j
  // 此时交换l和j后，就必然可以满足 [j,r]都>=x了 + 而原来arr[j]的值也是<=x的，放到最左边后就会满足[l, i-1]<=x
  swap(arr, l, j)
  return j
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}

