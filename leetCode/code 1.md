
# LeetCode1- 两数之和

## 思维解析

S1 最直接的 思路是 两层遍历，复杂度为 O(N*N)
S2 优化方法是利用空间换时间- 也就是利用额外的数据结构，来存储一些额外信息，以达到对数据的重复多次的查找/遍历 ==> hashMap

S3 重点：使用 hashMap记录之前已处理过的数据 `{value: index}`，从而直观的查找 元素是否已存储，减少一次遍历，时间复杂度为 O(1)

S4 技巧2:  两数之和 可以 转化为 `target-temp1差` 形式

关键词：hashMap / 和转差

## 代码实现
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let seen = new Map()
  // 易错点1: 用map等会无法提前中止循环
  for (let [index,v1] of nums.entries()) {
    let v2 = target - v1
    if (seen.has(v2)) {
      return [seen.get(v2), index]
    } 
    seen.set(v1, index)
  }
}
```

## 参考文档
[01 hashMap](https://leetcode-cn.com/problems/two-sum/solution/qing-xi-de-bian-liang-ming-ming-bang-zhu-ji-yi-bu-/)

[02 ES6- Set 和 Map](https://es6.ruanyifeng.com/#docs/set-map)