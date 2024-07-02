# LeetCode167- 两数之和 II 输入有序数组

## 图示

[01 一张图告诉你双指针解法的本质原理](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/solution/yi-zhang-tu-gao-su-ni-on-de-shuang-zhi-zhen-jie-fa/)


## 代码实现

```ts
function twoSum(numbers: number[], target: number): number[] {
  let front = 0, tail = numbers.length-1
  while (front < tail) {
      let addVal = numbers[front] + numbers[tail]
      if (addVal === target) return [front+1, tail+1]
      // 小于target，要想让当前和逼近target，就得加大左指针值
      // 同理如果大于target，就得减小右指针值
      addVal < target ? front++ : tail--
  }
}
```