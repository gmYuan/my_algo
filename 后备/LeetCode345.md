# LeetCode345- 反转字符串中的元音字母

# 题目描述

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

示例 1:
```
输入: "hello"
输出: "holle"
```

示例 2:
```
输入: "leetcode"
输出: "leotcede"
```
说明:
元音字母不包含字母"y"。

## 参考文档

[01 双指针实现](https://github.com/CyC2018/CS-Notes/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3%20-%20%E5%8F%8C%E6%8C%87%E9%92%88.md)

## 思维技巧

![双指针 查询特定元素](https://s1.ax1x.com/2020/06/07/t2yKwd.png)

## 代码实现

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  let target = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
  let temp = s.split('')
  let head = 0, tail = temp.length - 1
  while (head < tail) {
    if ( target.has(temp[head]) ) {
      if ( target.has(temp[tail]) ) {
        [ temp[head], temp[tail] ] = [ temp[tail], temp[head] ]
        head++  //tail的移动是必然的，所以写在外层
      }
      tail--  // head是元音 + 无论tail是不是元音，最后都要移动tail

    } else {    // head不是元音的情况，直接移动head
      head++
    }

  }
  return temp.join('')

}
```