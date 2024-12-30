// 剑指offer51/ LCR170-数组中的逆序对

function reversePairs(record) {
  return merge(record, 0, record.length - 1);
}

function merge(arr, l, r) {
  if (l >= r) return 0;
  const mid = l + ((r - l) >> 1);
  const r1 = merge(arr, l, mid);
  const r2 = merge(arr, mid + 1, r);
  // 优化点1: 说明必然是有序(升序)情况，本轮无需再进行 左右区间归并
  if (arr[mid] <= arr[mid + 1]) {
    return r1 + r2;
  }
  // 归并arr[l, mid]和arr[mid+1, r]的数组成员
  let r3 = mergePair(arr, l, mid, r);
  return r1 + r2 + r3;
}

function mergePair(arr, l, mid, r) {
  let res = 0;
  const temp = new Array(r - l + 1);
  let p1 = l, p2 = mid + 1, i = 0;
  while (p1 <= mid && p2 <= r) {
    if (arr[p1] <= arr[p2]) {
      temp[i++] = arr[p1++];
    } else {
      temp[i++] = arr[p2++];
      // 易错点1: 这里应该是 res += mid - p1 + 1; 而不是 res+= 1
      // 因为 在这种情况下，arr[p1~mid]必然 都会大于 当前的这个 arr[p2]值
      // 且索引是从0开始，所以其对应数量就是 mid - p1 + 1, 而不仅仅是当前p1这一个
      res += mid - p1 + 1;
    }
  }
  while (p1 <= mid) temp[i++] = arr[p1++];
  while (p2 <= r) temp[i++] = arr[p2++];
  for (let i = 0; i < temp.length; i++) {
    arr[l + i] = temp[i];
  }
  return res;
}
