# LeetCode20- 有效的括号

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/valid-parentheses/solution/valid-parentheses-fu-zhu-zhan-fa-by-jin407891080/)

[02 方法2参考](https://leetcode.cn/problems/valid-parentheses/solution/dai-ma-sui-xiang-lu-dai-ni-gao-ding-zhan-x3xw/)


## 代码实现

方法1: map + 栈  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function isValid(s: string): boolean {
  if (s.length === 1) return false
  const charMap = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ])
  let stack = []

  for (let char of s) {
    if (charMap.has(char)) {
      stack.push(char)
  } else {
    let popChar = stack.pop()
    // 右括号多余 或者 左右括号类型不匹配
    if (!popChar || charMap.get(popChar) !== char) return false
    }
  }
  // 防止 左括号多余
  return stack.length === 0
};
```

方法2: 栈  时间复杂度 O(n)  空间复杂度：O(n)
```ts
function isValid(s: string): boolean {
  let stack = []
  for (let char of s) {
    if (char === '(') {
      stack.push(')')
    } else if (char === '[') {
      stack.push(']')
    } else if (char === '{') {
      stack.push('}')
    // 遇到了右括号类型    
    } else {
      let popChar = stack.pop()
      // 右括号多余 或者 左右括号类型不匹配
      if (!popChar || popChar !== char) return false
    }
  }
   // 防止 左括号多余
  return stack.length === 0
};
```