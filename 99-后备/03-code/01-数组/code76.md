# LeetCode76- 最小覆盖子串

## 实现思路

1 思维关键词: 滑动窗口 + need/seed双Map + 扩大和缩小窗口 + match更新

## 参考文档

[滑动窗口法-双Map实现](https://www.bilibili.com/video/BV1Zd4y117AT/?spm_id_from=333.337.search-card.all.click&vd_source=de22748e25abdf5163defdbe3ac17e65)


## 代码实现

方法1: 滑动窗口  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function minWindow(s: string, t: string): string {
  // 滑动窗口指针
  let left = 0, right = 0
  let res = ''
  // 记录了 t里每个字符对应的数量
  let need = new Map()
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1)
  }
  // 记录当前窗口[left, right]里的，t中每个字符对应的数量
  let match = 0
  let seen = new Map()

  //S1 当扩大指针到底时，说明s全都被处理完了
  while (right < s.length) {
    //S2 扩大窗口
    let cur = s[right]
    right++
    // S2.2 当need里包含该字符时，说明该字符需要在seen中被记录
    if (need.has(cur)) {
      let pre = seen.get(cur) || 0
      // 易错点：语法细节，需要先++pre，否则seen.set的还是旧值
      seen.set(cur, ++pre)
      // S2.3 当pre和need里记录的个数相等时，match数量就可以+1==> 该字符(数量)已经都被包含在当前窗口里了
      if (pre === need.get(cur)) {
        match++
      }
    }
    //S3 缩小窗口：只要mathc === need.size，说明t里的所有字符(数量)都被包含了
    while (match === need.size) {
      // S3.1 更新字符结果
      let newRes = s.substring(left, right)
      if (!res.length || newRes.length < res.length) res = newRes
      // S3.2 处理当前左指针字符，由于left在本轮循环必然要被移出，所以要跟新它在seen里的值
      let leftChar = s[left]
      let pre = seen.get(leftChar)
      if (pre) {
        seen.set(leftChar, --pre)
        // 易错点 S3.3 当更新后的pre值数量少于need里的值时，说明该字符数量不满足了match，所以要更新循环值
        if (pre < need.get(leftChar)) match--
      }
      // S3.4 本轮循环必要要缩短left范围
      left++
    }
  }
  return res
};
```