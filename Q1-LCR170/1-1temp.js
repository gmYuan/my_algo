// 获取数组中元素的 逆序对数量
// [1,2,3]  ==> 3,1;  3,2;  2,1 ==> 3个

let res = 0

function reversePairs(record) {
  mergeSort(record, 0, record.length - 1)
  return res
}

function quickSort(arr, l, r) {
  if (l >= r) return;
  let mid = (l + r) >> 1
  mergeSort(arr, l, mid)
 
}

function partition(arr, l, r) {
 
  
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}


