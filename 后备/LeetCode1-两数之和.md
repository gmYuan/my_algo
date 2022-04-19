
# 题目描述

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 `两个` 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

## 思维技巧

1 最直接的 思路是 两层遍历，复杂度为 O(N*N)

2 转化为 {value: index}的 `MAP 哈希形式`，从而直观的查找 元素是否已存储，减少一次遍历

3 和 可以 转化为 `target-temp1差` 形式


## 参考文档

[01 LeetCode 第 1 号问题：两数之和](https://www.bilibili.com/video/BV17441147K7)

[02 ES6- Set 和 Map](https://es6.ruanyifeng.com/#docs/set-map)


## 代码实现

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {  // for循环可以正确 终止循环
    let otherValue = target-nums[i]

    if (map.has(otherValue)) {
      return [i, map.get(otherValue)]
    }

    map.set(nums[i], i)  
  }

  return new Error('未找到2个元素满足条件')
}
```