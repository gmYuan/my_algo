/*

给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5

 
示例 1：
输入：x = 4
输出：2


示例 2：
输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

提示：
0 <= x <= 2^31 - 1


*/

export {};

/**


*/

function mySqrt(x: number): number {
  // 46340是 2^31 - 1 的平方根
  let l = 0, r = Math.min(x, 46340) + 1;
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    mid * mid <= x ? (l = mid) : (r = mid);
  }
  return l;
}


// 变形题1： 求平方根，误差小于0.00001
// 变形题2： 求平方根，精确到小数点后10位
// https://leetcode.cn/problems/sqrtx/solutions/1309968/gojian-ji-er-fen-gai-bian-wei-jing-que-d-p4ow/