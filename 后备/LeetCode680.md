# LeetCode680- 验证回文字符串Ⅱ

# 题目描述

给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

示例 1:
```
输入: "aba"
输出: True
```

示例2:
```
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

## 参考文档

[01 双指针实现](https://github.com/CyC2018/CS-Notes/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3%20-%20%E5%8F%8C%E6%8C%87%E9%92%88.md#4-%E5%9B%9E%E6%96%87%E5%AD%97%E7%AC%A6%E4%B8%B2)


## 思维技巧

![双指针回溯 判断回文](https://s1.ax1x.com/2020/06/07/t2oBtO.png)

## 代码实现

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  let head = 0, tail = s.length - 1
  while (head <= tail) {
    if (s[head] === s[tail]) {
      head++
      tail--
    } else {
    return isPalindrome(s, head+1, tail) || isPalindrome(s, head, tail-1)  
    }
  }
  return true
};

function isPalindrome(s, start, end) {
  while (start <= end) {
    if (s[start] !== s[end]) return false
    start++
    end--
  }
  return true
}
```