# LeetCode150- 逆波兰表达式求值

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/evaluate-reverse-polish-notation/solution/dai-ma-jian-ji-de-jie-fa-jsban-ben-by-it-qp1u/)


## 代码实现

方法1: parseInt + 栈  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function evalRPN(tokens: string[]): number {
  let stack = []
  for (let cur of tokens) {
    // 如果是数字类型字符串，就存入栈
    if (!isNaN(+cur)) {
      stack.push(+cur)
    } else {
      let a = stack.pop()
      let b = stack.pop()
      if (cur === '+') {
        stack.push(b + a)
      } else if (cur === '-') {
        // 易错点1: 后出的为 被减数
        stack.push(b - a)
      } else if (cur === '*') {
        stack.push(b * a)
      } else {
        // 易错点2: 负数时Math.floor的取值不对，所以用parseInt
        stack.push(parseInt(String(b/a)))
      }
    }
  }
  return stack.pop()
};
```

