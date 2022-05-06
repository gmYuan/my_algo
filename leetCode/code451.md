# LeetCode451- 根据字符出现频率排序

## 图示

[01 方法 1 参考](https://leetcode-cn.com/problems/sort-characters-by-frequency/solution/javascript-451-gen-ju-zi-fu-chu-xian-pin-3pnk/)

[01 方法 2 参考](https://leetcode-cn.com/problems/sort-characters-by-frequency/solution/zi-jie-ti-ku-451-zhong-deng-gen-ju-zi-fu-z66w/)

## 代码实现

```ts
// 方法1: map + sort   O(n)
function frequencySort(s: string): string {
  // 1 使用Map记录字符出现频率
  let charMap = new Map();
  for (let char of s) {
    let preValue = charMap.get(char) || 0;
    charMap.set(char, preValue + 1);
  }
  // 2 对charMap里的元素按出现频率值，降序排列
  // [...charMap]的结构类似于 [ ['a', 3], ['b', 3] ]
  let sortedArr = [...charMap].sort((a, b) => b[1] - a[1]);

  // 3 按序拼接字符并返回
  return sortedArr.reduce((pre, [char, frequency]) => {
    return pre + char.repeat(frequency);
  }, "");
}
```

```ts
//方法2: Map + 桶排序  O(n)
function frequencySort(s: string): string {
  // 1 使用Map记录字符出现频率
  let charMap = new Map();
  for (let char of s) {
    let preValue = charMap.get(char) || 0;
    charMap.set(char, preValue + 1);
  }

  // 2 桶排序，以达到 对char的排序
  // 目标：把 { a: 3, b: 2, c: 1, d: 1} ==> [undefined, [c, d], [b,b], [a, a, a]]
  // list是一个二位数组， 其中frequency值对应list数组中的 索引位置
  let list = [];
  charMap.forEach((frequency, char) => {
    let curStr = char.repeat(frequency);
    if (!list[frequency]) {
      list[frequency] = [curStr];
    } else {
      list[frequency] = [...list[frequency], curStr];
    }
  });

  // 3 把list按 反向/降序读取，拼接出返回字符结果
  return list.reduceRight((pre, value) => {
    return pre + value.join("");
  }, "");
}
```
