# LeetCode3- 无重复字符的最长子串

## 实现思路

题目关键词: 无重复字符; 最长子串

思维关键词: record + 滑动窗口(slow & fast) + Math.max(slow, preSlow + 1)

参考实现:  <br/>
[01 滑动窗口+易错点讲解](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/javasi-lu-xiang-jie-xiao-bai-jiu-xing-by-wfbf/)


## 代码实现

1 滑动窗口 + recordMap 时间复杂度:O(n); 空间复杂度: O(1)

```ts
function lengthOfLongestSubstring(s: string): number {
  // 最长子串==> 滑动窗口

  let record = new Map() //记录char是否重复==> { char: 上一次出现的index(fast) }
  let res = 0
  // [slow, fast)范围内都是非重复字符
  for (let slow = 0, fast = 0; fast < s.length; fast++) {
    let char = s[fast]
    // 说明出现了重复字符，要更新slow左边界指针 到最新的上一次重复字符位置的 下一个字符
    if (record.has(char)) {
      //易错点1: 取最大值是为了避免回文(abba中的第2个a) 导致的 slow值错误回滚的情况
      slow = Math.max(slow, record.get(char) + 1)
    }
    // 易错点2: 不管之前是否有记录，都更新当前char的出现index为 当前的最新位置==> 从而让slow能 正确定位
    record.set(char, fast)
    res = Math.max(res, fast - slow + 1)
  }

  return res
}
```
