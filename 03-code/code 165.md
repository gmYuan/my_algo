# LeetCode165- 比较版本号

## 思维解析

1 考察点：滑动指针 + 循环进制计算

2 实现步骤：
  - 尽量不使用额外空间，所以不使用split，把字符串转成数组
  - 使用滑动指针，来记录v1/v2 中各自 已处理过的字符串
  
  - 易错点是 版本号可以有前导0， 即 1.01 和 1.001是相等的
  - 所以需要根据 分隔号，来记录数字大小，在遇到下一个分隔号之前，对这一段字符串进行 循环进制计算： v1 = v1 * 10 + version1[p1]

  
## 代码实现

```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
  let p1 = 0, p2 = 0, end = Math.max(version1.length, version2.length)
  while (p1 < end || p2 < end) {
    let v1 = 0, v2 = 0

   // 易错点1：对一个分隔符内的一串字符串，要进行循环进制计算
   // 易错点2:  要有 p1 < version1.length的限制， 举例  1.01 和 1.1.33，当到1.01的最后一位时，如果没有限制，p1就一直在自增而永远不会终止了
    while(p1 < version1.length &&  version1[p1] !== '.') {
      v1 = v1* 10 + Number(version1[p1])
      p1++
    }
    while(p2 < version2.length && version2[p2] !== '.') {
      v2 = v2* 10 + Number(version2[p2])
      p2++
    }
    
    if (v1 === v2) {
      p1++
      p2++
      v1 = v2= 0
    } else {
      return v1 < v2 ? -1 : 1
    }    
  }
  return 0
}
```

## 参考文档

[指针+进制计算](https://leetcode-cn.com/problems/compare-version-numbers/solution/shuang-100-c-by-mszjaas/)