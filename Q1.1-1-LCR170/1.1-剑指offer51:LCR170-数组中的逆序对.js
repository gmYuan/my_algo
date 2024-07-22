let temp = [];

function reversePairs(record: number[]): number {
  let len = record.length;
  temp = new Array(len);
  return mergeSort(record, 0, len - 1);
}

function mergeSort(arr, l, r) {
  if (l >= r) return 0;
  // 递归实现
  let mid = (l + r) >> 1;
  let r1 = mergeSort(arr, l, mid);
  let r2 = mergeSort(arr, mid + 1, r);
  // 说明必然是有序(升序)情况，本轮无需再进行归并
  if (arr[mid] <= arr[mid + 1]) {
    return r1 + r2;
  }
  // 归并arr[l, mid]和arr[mid+1, r]的数组成员
  let r3 = mergePair(arr, l, mid, r);
  return r1 + r2 + r3;
}

function mergePair(arr, l, mid, r) {
  // 易错点1: 这里不能使用temp = arr.slice(l, r+1)，因为这样会形成索引位置偏移
  // 即 recodep[5~9]会偏移为temp[0,4]，导致后续从temp[l/mid]取值比较时，会形成空值比较
  // 导致 record数组内容错误 && count值计算错误
  for (let i = l; i <= r; i++) {
    temp[i] = arr[i];
  }
  // 开始比较和合并
  let i = l, j = mid + 1, p = l;
  let count = 0;
  while (i <= mid && j <= r) {
    if (temp[i] <= temp[j]) {
      arr[p++] = temp[i++];
    } else {
      arr[p++] = temp[j++];
      // 重点1: 之所以是mid - i + 1，是因为这种情况下，temp[i~mid]都一定会大于temp[j]
      //        因为索引是从0开始，所以其对应数量就是 mid - i + 1
      // 重点2: 之所以是+=，是因为该次比较完成后，会继续进入下一次符合的 while循环
      //        所以需要累计 逆序对数量
      count += mid - i + 1;
    }
  }
  while (i <= mid) arr[p++] = temp[i++];
  while (j <= r) arr[p++] = temp[j++];
  return count;
}
