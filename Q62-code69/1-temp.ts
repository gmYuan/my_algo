/*
// 变形题1： 求平方根，误差小于0.00001
// 变形题2： 求平方根，精确到小数点后10位

*/

// 简化版本：利用JS语法特性
const mySqrt = (x, n) => {
  if (x === 0 || x === 1) return x;
  
  // 利用解构和三元运算符简化变量赋值
  let l = 0, r = x > 1 ? x : 1;
  
  // 计算精度：小数点后n位意味着误差要小于10^(-n-1)
  let eps = Math.pow(10, -(n + 1));

  
  // 二分搜索：利用解构赋值简化更新
  while (r - l > eps) {
    const mid = (l + r) / 2;
    mid * mid < x ? l = mid : r = mid;
  }
  
  // 为什么是 l + r / 2
  return parseFloat(((l + r) / 2).toFixed(n));
};

// 测试用例验证
console.log('=== 验证当前实现 ===');
console.log('sqrt(4) 精确到2位:', mySqrt(4, 2));     // 期望: 2.00
console.log('sqrt(2) 精确到3位:', mySqrt(2, 3));     // 期望: 1.414
console.log('sqrt(9) 精确到1位:', mySqrt(9, 1));     // 期望: 3.0
console.log('sqrt(0.25) 精确到3位:', mySqrt(0.25, 3)); // 期望: 0.500
console.log('sqrt(10) 精确到4位:', mySqrt(10, 4));   // 期望: 3.1623

// 验证边界情况
console.log('\n=== 边界情况验证 ===');
console.log('sqrt(0):', mySqrt(0, 3));              // 期望: 0
console.log('sqrt(1):', mySqrt(1, 3));              // 期望: 1
