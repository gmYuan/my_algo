# LeetCode20- 有效的括号

## 思维解析

1 左括号必须用 相同类型的右括号闭合 ==> 利用栈 `遇左则存右`

2 左括号必须以 正确的顺序闭合 ==> 顺序为 `后进先出`

3 易错点:

- 1 if/if/if 和 if/else if/else if 的区别

- 2 结对匹配后，要看栈中是否还存在元素，防止出现`[[]的情况`


## 代码实现

```js
/**
 * @param {string} s
 * @return {boolean}
*/

var isValid = function(s) {
  let stack = []
  for(let str of s) {
    if (str === '(') stack.push(')');
    else if (str === '[') stack.push(']');
    else if (str === '{') stack.push('}');
    else if (str !== stack.pop()) return false;
  }

  return stack.length === 0
};
```