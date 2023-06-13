# LeetCode1- 两数之和

## 实现思路

1 思维关键词: Map; needVal

## 参考文档

[Map-官方实现](https://leetcode.cn/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/)


## 代码实现

方法1: Map + needVal  时间复杂度: O(n)  空间复杂度: O(n)

```ts
function twoSum(nums: number[], target: number): number[] {
  // 存储之前出现过的元素，key为数字值，value为数字值所在的索引
  let seen = new Map()
  for (let i = 0; i < nums.length; i++) {
    let needVal = target - nums[i]
    if (seen.has(needVal)) {
      return [seen.get(needVal), i]
    }
    seen.set(nums[i], i)
  }
};
```
