# LeetCode1- 两数之和

## 参考实现

无

## 代码实现

```ts
function twoSum(nums: number[], target: number): number[] {
  // 存储之前出现过的元素，key为数字值，value为数字值所在的索引
  let saveMap = new Map();
  // 易错点1: 用map等会无法提前中止循环
  for (let [index, v1] of nums.entries()) {
    let v2 = target - v1;
    if (saveMap.has(v2)) {
      return [saveMap.get(v2), index];
    }
    saveMap.set(v1, index);
  }
}
```
