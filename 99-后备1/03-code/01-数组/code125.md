# LeetCode125-  验证回文串

## 实现思路

题目关键词: 回文串

思维关键词: 非合法字符处理 + 首尾指针


参考实现:  <br/>
[01 官方题解](https://leetcode.cn/problems/valid-palindrome/solution/yan-zheng-hui-wen-chuan-by-leetcode-solution/)



## 代码实现

方法1: 首位指针 平均时间复杂度:O(s); 空间复杂度: O(1)

```ts
function isPalindrome(s: string): boolean {
  if (!s) return true
  // 易错点：排除非数字和字符的其他字符 + 排除空格 + 统一大小写
  s = s.replace(/[^a-zA-Z0-9]/g, "")
       .replace(/\s/g, "")
       .toLowerCase()
  // 首尾指针
  let front = 0, tail = s.length - 1
  while (front < tail) {
    if (s[front] ===  s[tail]) {
      front++
      tail--
    } else {
      return false
    }
  }
  return true
};
```

