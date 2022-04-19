# LeetCode524

# 题目描述

给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

示例 1:
```
输入:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

输出: 
"apple"
```

示例 2:
```
输入:
s = "abpcplea", d = ["a","b","c"]

输出: 
"a"
```

说明:
1. 所有输入的字符串只包含小写字母。
2. 字典的大小不会超过 1000。
3. 所有输入的字符串长度不会超过 1000。


## 参考文档

[01 双指针解法](https://github.com/CyC2018/CS-Notes/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3%20-%20%E5%8F%8C%E6%8C%87%E9%92%88.md)


## 思维技巧

![双指针判断 子字符串方法](https://s1.ax1x.com/2020/06/09/t4RHPS.png)


## 代码实现

```js
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
var findLongestWord = function(s, d) {
  let res = ''
  for (let target of d) {
    if (res.length > target.length || (res.length === target.length && res < target)  ) {
      continue;
    }
    if ( isSubStr(s, target) ) {
      res = target
    }
  }

  return res
};

function isSubStr(origin, target) {
  let originHead = 0, targetHead = 0
  while (originHead < origin.length && targetHead < target.length) {
    if (origin[originHead] === target[targetHead]) {
      targetHead++
    }
    originHead++
  }

  return targetHead === target.length
}
```





