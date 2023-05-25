# LeetCode11- 盛最多水的容器

## 实现思路

题目关键词: /

思维关键词: 首尾指针; 最短边的高度决定了容器高度; 越向内移动宽度越小

参考实现: <br/>
[首尾指针法-解释首尾指针的合理性](https://leetcode.cn/problems/container-with-most-water/solution/on-shuang-zhi-zhen-jie-fa-li-jie-zheng-que-xing-tu/)


## 代码实现

方法1: 首尾指针  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function maxArea(height: number[]): number {
  let front = 0, tail = height.length - 1
  let res = 0
  while (front < tail) {
    const width = tail - front
    res = height[front] <= height[tail] 
      ? Math.max(res, height[front++] * width)
      : Math.max(res, height[tail--] * width)
  }
  return res
}
```