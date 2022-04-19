# LeetCode3- 无重复字符的最长子串

## 思维解析

1 考察点：hashMap + 滑动窗口

2 实现步骤：
  - 情况1 遍历的字符串互不重复， 如abc....z，此时 start = 0, end 假设 等于5
  - 情况2 出现了重复字符 ，如 abc...zz，此时 start要到重复字符z之前出现的位置的后面1位 + 更新z出现的位置，即 start = seen[s[end]] + 1  && seen[s[end]] = end
  - 情况3 出现重复字符 且 该字符之前的位置在 当前start之前， 如 abc...zza，此时假设 start = 4，a之前出现的位置是0，此时start就不应该取1，因为如果start = 1,那么必然就会存在 重复字符(zza)，所以start应该继续取当前值4

 - 综上，易错点1: start = Math.max(start, seen[s[end]] + 1)
 - 易错点2: ans = Math.max(ans, end - start + 1)
 - 易错点3: 当用数组来表示hashmap时，需要注意区分 0和 undefined


## 代码实现

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let ans = 0
  let seen = []
  for (let start = 0, end = 0; end < s.length; end++) {
    if (seen[s[end]] === undefined) {
      seen[s[end] ]= -1
    }
    start = Math.max(start, seen[s[end]] + 1)
    ans = Math.max(ans, end - start + 1)
    seen[s[end]] = end
  }
  return ans
}
```

## 参考文档

[官方解答](https://leetcode-cn.com/problems/add-strings/solution/zi-fu-chuan-xiang-jia-by-leetcode-solution/)

[花花酱解答](https://www.bilibili.com/video/BV1CJ411G7Nn?from=search&seid=3003735044226137725)