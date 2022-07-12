# LeetCode75- 颜色分类

## 图示

[实现参考](https://leetcode-cn.com/problems/sort-colors/solution/75-yan-se-fen-lei-san-lu-kuai-pai-by-din-84w8/)


## 代码实现

```ts
function sortColors(nums: number[]): void {
  //双指针法
  //  [0, front]为0， [front+1, i-1]为1， [tail, nums.length-1]为2
  let front = -1, tail = nums.length
  for (let i = 0; i < tail; ) {
    if (nums[i] === 1) {
      i++
    } else if (nums[i] === 0) {
      front++
      [nums[front], nums[i]] = [nums[i], nums[front]]
      i++
    } else if (nums[i] === 2) {
      tail--
      [nums[tail], nums[i]] = [nums[i], nums[tail]]
    }
  }
}
```
