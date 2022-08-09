# LeetCode71- 简化路径

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/simplify-path/solution/jian-hua-lu-jing-by-leetcode-solution-aucq/)


## 代码实现

方法1: split + 栈  时间复杂度 O(n)  空间复杂度：O(n)

```ts
ffunction simplifyPath(path: string): string {
  // paths的成员可能有: . .. 空字符串  数字字符等
  let paths = path.split('/')
  let stack = []
  for (let cur of paths) {
    if (cur === '..') {
      stack.pop()
    } else if (cur !== '' && cur !== '.') {
      stack.push(cur)
    }
  }
  return '/' + stack.join('/')
};
```

