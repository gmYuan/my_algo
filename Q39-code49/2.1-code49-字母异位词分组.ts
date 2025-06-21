/*
给你一个字符串数组，请你将 字母异位词 组合在一起。
可以按任意顺序返回结果列表。

 
示例 1:
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

解释：
在 strs 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。

示例 2:
输入: strs = [""]
输出: [[""]]

示例 3:
输入: strs = ["a"]
输出: [["a"]]
*/

function groupAnagrams(strs: string[]): string[][] {
  const saved = new Map();
  for (let str of strs) {
    // 易错点1：字符编码之和作为key, 可能会有哈希冲突（如 "az" 和 "by"）
    // 正确方法：对字符串中的字符进行排序, 排序后的字符串对于所有异位词都是相同的
    const strKey = str.split("").sort().join("");
    const pre = saved.get(strKey) || [];
    saved.set(strKey, [...pre, str]);
  }
  return [...saved.values()];
}
