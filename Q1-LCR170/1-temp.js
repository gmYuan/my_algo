var buf = "";
process.stdin.on("readable", function () {
  var chunk = process.stdin.read();
  if (chunk) buf += chunk.toString();
});
let getInputArgs = (line) => {
  return line
    .split(" ")
    .filter((s) => s !== "")
    .map((x) => parseInt(x));
};
process.stdin.on("end", function () {
  buf.split("\n").forEach(function (line, lineIdx) {
    if (lineIdx === 1) {
      let arr = getInputArgs(line);
      const res = mergeSort(arr, 0, arr.length - 1);
      console.log(res);
    }
  });
});

function mergeSort(arr, l, r) {
  if (l >= r) return 0;
  const mid = (l + r) >> 1;
  const r1 = mergeSort(arr, l, mid);
  const r2 = mergeSort(arr, mid + 1, r);
  // 优化点: 如果 arr[mid] < arr[mid + 1] 说明 arr[l, r] 已经有序
  if (arr[mid] < arr[mid + 1]) {
    return r1 + r2;
  }
  const r3 = mergePair(arr, l, mid, r);
  return r1 + r2 + r3;
}

function mergePair(arr, l, mid, r) {
  let res = 0;
  const temp = arr.slice(l, r + 1);
  let p1 = l, p2 = mid + 1, i = 0;
  while (p1 <= mid && p2 <= r) {
    if (arr[p1] <= arr[p2]) {
      temp[i++] = arr[p1++];
    } else {
      // 易错点: 这里需要计算逆序对,此时 p1~mid 都是逆序对
      res += mid - p1 + 1;
      temp[i++] = arr[p2++];
    }
  }
  while (p1 <= mid) temp[i++] = arr[p1++];
  while (p2 <= r) temp[i++] = arr[p2++];
  for (let i = 0; i < temp.length; i++) {
    arr[l + i] = temp[i];
  }
  return res;
}
