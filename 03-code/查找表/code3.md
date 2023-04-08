# LeetCode209- 无重复字符的最长子串

## 图示

[01 滑动窗口+易错点讲解](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/javasi-lu-xiang-jie-xiao-bai-jiu-xing-by-wfbf/)

## 代码实现

```ts
function lengthOfLongestSubstring(s: string): number {
  // 设置指针 [left, righ)间为不重复子串
  let left = 0,
    right = 0;
  // 保存每个字符出现过的最后一次的位置
  let seenCharMap = new Map();
  let res = 0;

  while (right < s.length) {
    let curChar = s[right];
    // 缩小窗口范围
    if (seenCharMap.has(curChar)) {
      // 易错点，防止窗口范围被缩小
      left = Math.max(left, seenCharMap.get(curChar) + 1);
    }
    // 扩大窗口范围
    seenCharMap.set(curChar, right);
    right++;
    res = Math.max(res, right - left);
  }
  return res;
}
```
