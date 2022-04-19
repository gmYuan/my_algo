
# 题目描述

给定一个字符串，请你找出其中不含有重复字符的 `最长子串` 的长度。

示例 1:

```
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
    请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```


## 思维技巧

1 字符串/子串: `Sliding Window`

  S1 map + left & right
  
  S2 移动right + 有重复子串时，更新left值
  
  S3 max记录 left和 res


## 参考文档

[01 滑动窗口](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/hua-dong-chuang-kou-by-powcai/)

[02 无重复字符最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/wu-zhong-fu-zi-fu-zui-chang-zi-chuan-by-fa-kuang-d/)

[03 String方法](https://wangdoc.com/javascript/stdlib/string.html)

## 代码实现

```js
/**
 * @param {string} s
 * @return {number}
 */

// 典型例子: s = 'abc dcb'

var lengthOfLongestSubstring = function(s) {
  let res = 0, map = new Map()

  //S1 记录是否重复的 left + 遍历窗口的right
  for (let left = 0, right = 0; right < s.length; right++) {
    let curChar = s[right];

    if (map.has(curChar)) {
      //S3 有重复子串时，则更新left到 重复出现过的元素的 最靠后的位置
      //     max的作用是，确保 已经指到5时， 不会指回到5之前的位置
      left = Math.max(left, map.get(curChar)+1)
    }

    //S2 存储记录 遍历过的子串
    map.set(curChar, right)

    //S4 max的作用是，确保 记录的是最长的长度值，而不会被 之后较短的子串长度覆盖
    res = Math.max(res, right-left+1)
  }

  return res
}


//实现2 更JS的写法如下  s = 'abc dcbbb'
var lengthOfLongestSubstring = function(s) {
  let res = 0, hasIndex = 0

  for (let left = right = 0; right < s.length; right++) {
    hasIndex = s.slice(left, right).indexOf(s[right])

    if (hasIndex !== -1) {
      //slice截取的内容是变化的，所以 当前窗口 = 之前截取掉的窗口长度 + 当前子串位置
      left = left + hasIndex+1  
    } else {
      res = Math.max(res, right-left+1)
    }

  }

  return res
}
```