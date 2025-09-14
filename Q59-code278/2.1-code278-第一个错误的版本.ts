/*

你是产品经理，目前正在带领一个团队开发新的产品。
不幸的是，你的产品的最新版本没有通过质量检测。
由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。
实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。


示例 1：

输入：n = 5, bad = 4
输出：4
解释：
调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true
所以，4 是第一个错误的版本。


示例 2：
输入：n = 1, bad = 1
输出：1
 
提示：
1 <= bad <= n <= 2^31 - 1

*/

export {};

/**

10 


*/

/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function (isBadVersion: any) {
  return function (n: number): number {
    // 左闭：不可确认分段；右闭：不可确认分段
    // 循环不变量含义：check(l-1)属于分段false; check(r+1)属于分段true
    let l = 1, r = n;
    while (l <= r) {
      const mid = l + ((r - l) >> 1);
      if (isBadVersion(mid)) {
        // 此时可以确定 mid之后的所有元素 必然属于分段true了
        // 所以下次 待处理判断的范围，可以 缩小到[l, mid-1]
        // 从而保证 循环不变量成立
        r = mid - 1;
      } else {
        // 同上，此时可确定 mid之前的所有元素 必然属于分段false了
        // 所以下次 待处理判断的范围，可以 缩小到[mid+1, r]
        l = mid + 1;
      }
    }
    // 运行到l===r时，如果check(mid === l)属于true，则 r会取到l-1，
    // 所以最后返回 l 或者 r +1 都可
    return l;
  };
};
