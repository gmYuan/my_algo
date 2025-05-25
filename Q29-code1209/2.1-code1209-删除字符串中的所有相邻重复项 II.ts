/**
 * 
code1209- 删除字符串中的所有相邻重复项 II

给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，
并删除它们，使被删去的字符串的左侧和右侧连在一起。

你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。
在执行完所有删除操作后，返回最终得到的字符串。
本题答案保证唯一。

 

示例 1：
输入：s = "abcd", k = 2
输出："abcd"
解释：没有要删除的内容。

示例 2：
输入：s = "deeedbbcccbdaa", k = 3
输出："aa"
解释： 
先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
再删除 "bbb"，得到 "dddaa"
最后删除 "ddd"，得到 "aa"
示例 3：

输入：s = "pbbcggttciiippooaais", k = 2
过程： pcciis-> ps
输出："ps"
*/

export {};

function removeDuplicates(s: string, k: number): string {
   // [char, count]
  const st: [string, number][] = [];
  for (let char of s) {
    if (!st.length || st.at(-1)[0] !== char) {
      st.push([char, 1]);
    } else {
      st.at(-1)[1] = st.at(-1)[1] + 1;
      if (st.at(-1)[1] === k) st.pop();
    }
  }

  // 易错点1：需要 将栈中的元素转换回字符串，每个字符重复其计数次数
  return st.map(([char, count]) => char.repeat(count)).join("");
}
