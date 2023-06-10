# LeetCode350- 两个数组的交集 II

## 图示

[01 官方讲解](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/liang-ge-shu-zu-de-jiao-ji-ii-by-leetcode-solution/)

## 代码实现

```ts
function intersect(nums1: number[], nums2: number[]): number[] {
  let numMap = new Map();
  let res = [];
  nums1.forEach((cur1) => {
    let preValue = numMap.get(cur1);
    let newValue = preValue ? preValue + 1 : 1;
    numMap.set(cur1, newValue);
  });
  nums2.forEach((cur2) => {
    let savedNum = numMap.get(cur2);
    if (savedNum > 0) {
      res.push(cur2);
      numMap.set(cur2, savedNum - 1);
    }
  });
  return res;
}
```
