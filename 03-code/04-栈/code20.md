# LeetCode20- 有效的括号

## 实现思路

1 思维关键词: map + 栈

2 参考文档

[01 官方实现](https://leetcode.cn/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/)


## 代码实现

1 方法1: map + 栈  时间复杂度: O(n);  空间复杂度(n)
```ts
function isValid(s: string): boolean {
  let stack = [];
  const pairs = new Map([
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
  ]);
  for (let char of s) {
    if (pairs.has(char)) {
      stack.push(char);
    } else {
      // 说明当前字符char是右字符串，判断char和left对应值是否相等
      const left = stack.pop();
      if (char !== pairs.get(left)) return false;
    }
  }
  // 易错点，防止有多余的左字符
  return stack.length === 0;
}
```
