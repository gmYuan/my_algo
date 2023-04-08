# LeetCode415- 字符串相加

## 思维解析

1 考察点：大数相加 / 双指针
2 易错点：
  - a/b之间 字符串长度不一致时：默认取0进行处理；
  - 进位处理：用carry位进行存储


## 代码实现

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let p1 = num1.length - 1, p2 = num2.length - 1, carry = 0;
  let resArr = []

  while (p1 >= 0 || p2 >= 0 || carry > 0) {
    // 易错点： 通过当前位索引是否为负数，来判断是否需要默认补0
    const add1 = p1 >= 0 ? num1.charAt(p1) - '0' : 0
    const add2 = p2 >= 0 ? num2.charAt(p2) - '0' : 0
    // 得到结果 --> 存入当前位 + 更新进位
    let res = add1 + add2 + carry
    let cur = res % 10
    carry = Math.floor(res / 10)
    resArr.push(cur)
    // 更新指针位置
    p1--
    p2--
  }
  return resArr.reverse().join('')
}
```

## 参考文档

[官方解答](https://leetcode-cn.com/problems/add-strings/solution/zi-fu-chuan-xiang-jia-by-leetcode-solution/)