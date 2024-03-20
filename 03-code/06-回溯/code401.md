# LeetCode401- 二进制手表

1 思维关键词: 
  - 方法1: 二进制暴力法
  - 方法2: 回溯法

2 参考文档

[01-方法1参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0401-Binary-Watch/cpp-0401/main.cpp)

[02-方法2参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0401-Binary-Watch/cpp-0401/main2.cpp)


## 代码实现

1 方法1: 二进制暴力法  时间复杂度: O(2^10);  空间复杂度: O(1)

```ts
function readBinaryWatch(turnedOn: number): string[] {
  const res = [];
  // 4位小时位 + 6位分秒位，所以可以表示的数字一共有[0, 2^10-1]
  for (let i = 0; i < 1 << 10; i++) {
    // turnedOn灯亮的数量，即10位二进制数里对应值为1的个数
    if (getBit1Num(i) === turnedOn) {
      // 通过位运算，分别获取6位的分秒值 和 4位的小时值
      let minutes = i & 0b111111, hour = i >> 6;
      // 易错点: 本题里12:00不是一个合法值，所以hour需要小于12
      if (hour < 12 && minutes < 60) {
        let time = `${hour}:`;
        time += minutes < 10 ? `0${minutes}` : `${minutes}`;
        res.push(time);
      }
    }
  }
  return res;
}

// 获取10进制数num，对应的二进制里每一位值为1的数量
function getBit1Num(num) {
  let res = 0;
  while (num) {
    res += num % 2;
    // 易错点: JS里 num/2会保留小数部分，所以直接用位操作法更高效
    num >>= 1;
  }
  return res;
}
```


2 方法2: 回溯法   时间复杂度: O(2^10);  空间复杂度: O(1)

```ts

```