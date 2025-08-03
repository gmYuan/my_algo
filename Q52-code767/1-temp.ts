/*
给定一个字符串 s ，检查是否能重新排布其中的字母，使得两相邻的字符不同。
返回 s 的任意可能的重新排列。若不可行，返回空字符串 "" 。

示例 1:
输入: s = "aab"
输出: "aba"

示例 2:
输入: s = "aaab"
输出: ""
 
提示:
1 <= s.length <= 500
s 只包含小写字母

*/

export {};

function reorganizeString(s: string): string {
  // S1 桶排序(计数排序)： 统计最大频率 + 最大字符
  // S2 判断可行性
  // S3 优先放置 最大频率字符 + 去除该字符
  // S4 隔位置 放置其他字符即可

  const n = s.length;
  const buckets = new Array(26).fill(0);
  let maxFreq = 0, maxIdx = 0;

  // 统计频率并找最大频率字符
  for (const ch of s) {
    const idx = ch.charCodeAt(0) - 97;
    buckets[idx]++;
    if (buckets[idx] > maxFreq) {
      maxFreq = buckets[idx];
      maxIdx = idx;
    }
  }
  // 判断可行性
  if (maxFreq > (n + 1) >> 1) return "";

  const res = new Array(n);
  let pos = 0;

  // 先放最大频率字符到偶数位置
  while (buckets[maxIdx] > 0) {
    res[pos] = String.fromCharCode(maxIdx + 97);
    pos += 2;
    buckets[maxIdx]--;
  }

  // 放其他字符
  for (let j = 0; j < 26; j++) {
    while (buckets[j] > 0) {
      // 切换到奇数位置
      if (pos >= n) pos = 1;
      res[pos] = String.fromCharCode(j + 97);
      pos += 2;
      buckets[j]--;
    }
  }
  return res.join("");
}
