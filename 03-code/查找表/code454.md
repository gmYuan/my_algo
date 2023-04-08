# LeetCode454- 四数相加 II

## 图示

[01 思路参考](https://leetcode.cn/problems/4sum-ii/solution/chao-ji-rong-yi-li-jie-de-fang-fa-si-shu-xiang-jia/)

[01 前端语法参考](https://leetcode.cn/problems/4sum-ii/solution/ha-xi-biao-1xing-dai-ma-5xie-fa-chao-100fu-yuan-yi/)

## 代码实现

```ts
//方法: Map   O(n^2)
function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let res = 0;
  let sumMap = new Map();
  for (let v3 of nums3) {
    for (let v4 of nums4) {
      const preSum = sumMap.get(v3 + v4) || 0;
      sumMap.set(v3 + v4, preSum + 1);
    }
  }
  for (let v1 of nums1) {
    for (let v2 of nums2) {
      const target = 0 - (v1 + v2);
      sumMap.has(target) ? (res += sumMap.get(target)) : res;
    }
  }
  return res;
}
```
