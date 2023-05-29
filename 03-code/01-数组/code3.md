# LeetCode3- 无重复字符的最长子串

## 实现思路

题目关键词: 无重复字符; 最长子串

思维关键词: seenMap + slow_fast滑动窗口 + slow值要正确更新(避免回滚的情况)

参考实现:  <br/>
[01 滑动窗口+易错点讲解](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/javasi-lu-xiang-jie-xiao-bai-jiu-xing-by-wfbf/)


## 代码实现

1 滑动窗口 + seenMap 时间复杂度:O(n); 空间复杂度: O(1)

```ts
function lengthOfLongestSubstring(s: string): number {
  // 设置指针 [slow, fast)间为不重复子串
  let slow = 0, fast = 0;
  // 保存每个字符出现过的最后一次的位置
  let seen = new Map();
  let res = 0;
  while (fast < s.length) {
    let curChar = s[fast];
    if (seen.has(curChar)) {
      // 易错点1，取最大值是为了避免回文情况导致的slow值错误回滚的情况
      slow = Math.max(slow, seen.get(curChar) + 1);
    }
    // 易错点2；seen里每次都保存最新位置，从而让slow能正确定位到重复后的位置
    seen.set(curChar, fast);
    fast++;
    res = Math.max(res, fast - slow);
  }
  return res;
}
```
