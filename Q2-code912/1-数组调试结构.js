function sortArray(nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
}

function quickSort(arr, l, r) {
  if (l >= r) return;
  let [lt, gt] = partiton(arr, l, r);
  quickSort(arr, l, lt);
  quickSort(arr, gt, r);
}

function partiton(arr, l, r) {
  // 随机获取基准值
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, rdx);
  let x = arr[l];
  // [l+1, lq) < x; [lq, i) === x; (gt, r] > x
  let lq = l + 1, gt = r, i = l + 1
  while (i < gt) {
    if (arr[i] < x) {
      swap(arr, i, lq)
    } else if (arr[i] === x) {
      i++
    } else {
      swap(arr, i, gt--)
    }
  }
  swap(arr, l, lq--)
  return [lq-1, gt+1]
}





function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

let res = sortArray([5, 1, 1, 2, 0, 0]);
console.log("rr", res);





/**
 * 
 * 
 * 三路快排正确实现
 * 
 * function sortArray(nums: number[]): number[] {
  quickSort(nums, 0, nums.length - 1);
  return nums;
};

function quickSort(arr, l, r) {
  if (l >= r) return;
  let [lt, gt] = partition(arr, l, r);
  quickSort(arr, l, lt);
  quickSort(arr, gt, r);
}

function partition(arr, l, r) {
  let rdx = Math.floor(Math.random() * (r - l + 1))+ l
  swap(arr, l, rdx)
  let x = arr[l]

  // 从l+1开始处理，在循环中保证 [l+1, lt]都<x, [lt+1, i)都===x, [gt, r]都>x
  let lt = l, gt = r + 1, i = l + 1
  while (i < gt) {
    if (arr[i] < x) {
      swap(arr, i++, ++lt)
    } else if (arr[i] === x) {
      i++
    } else {
      swap(arr, i, --gt)
    }
  }
  swap(arr, l, lt)
  // 经过交换后，lt此时的含义是[l+1,lt-1]<x; [lt, gt-1]===x; [gt, r]>x
  return [lt-1, gt]
}


function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}
 * 
 * 
 * 
 */