# LeetCode217- 存在重复元素

## 图示

[01 思路参考](https://leetcode.cn/problems/contains-duplicate/solution/by-sengmitnick-suj5/)

## 代码实现

```ts
//方法: Map   时间复杂度 O(n)；空间复杂度 O(n)
function containsDuplicate(nums: number[]): boolean {
  let numMap = new Set();
  for (let num1 of nums) {
    if (numMap.has(num1)) return true;
    numMap.add(num1);
  }
  return false;
}
```
