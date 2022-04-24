# LeetCode167- 两数之和 II - 输入有序数组

## 图示

[01 双指针实现](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/solution/shuang-zhi-zhen-by-fejwong/)


## 代码实现

```ts
function twoSum(numbers: number[], target: number): number[] {
  let front = 0, tail = numbers.length-1
  while (front < tail) {
      let addValue = numbers[front] + numbers[tail]
      if (addValue === target) return [front+1, tail+1]
      // 和比目标值小时，增大最小值; 比目标值大时，减小最大值
      addValue < target ? front++ : tail--
  }
}
```