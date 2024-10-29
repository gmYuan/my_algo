function subLargeNumber(num1, num2) {
  // 按低位-->高位 顺序生成每位的 数组
  let num1Arr = String(num1).split("").reverse();
  let num2Arr = String(num2).split("").reverse();
  let res = [];
  if (compare(num1Arr, num2Arr)) {
    res = subImp(num1Arr, num2Arr);
  } else {
    res = subImp(num2Arr, num1Arr);
    // num1 < num2，那么 num1 - num2 的结果 需要添加负号
    res.push("-");
  }
  return res.reverse().join("");
}

// 比较num1和num2大小，返回是否有 num1>= num2
function compare(num1, num2) {
  if (num1.length !== num2.length) return num1.length > num2.length;
  // 倒序从 高位-->低位 比较每一位
  for (let i = num1.length - 1; i >= 0; i--) {
    if (num1[i] !== num2[i]) return num1[i] > num2[i];
  }
  // 运行到这一步，说明每一位都相等，则num1 >= num2 还是成立的
  return true;
}

// 具体大数相减实现，注意到这一步已经确保 num1 >= num2
function subImp(num1, num2) {
  let res = [];
  let carry = 0;
  // 从低位-->高位 每一位相减
  for (let i = 0; i < num1.length; i++) {
    let curVal = num1[i] - carry - (+num2[i] || 0);
    // 重点:  (curVal + 10) % 10 的表达式能 同时处理相减后 正数和负数的情况
    res.push((curVal + 10) % 10);
    carry = curVal < 0 ? 1 : 0;
  }
  // 去除res中多余的前置0
  while (res.length > 1 && res[res.length - 1] === 0) res.pop();
  return res;
}

let ex = subLargeNumber(123, 456);
console.log(ex);
