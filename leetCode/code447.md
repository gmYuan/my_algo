# LeetCode447- 回旋镖的数量

## 图示

[01 思路参考](https://leetcode.cn/problems/number-of-boomerangs/solution/447-hui-xuan-biao-de-shu-liang-yong-ha-x-gmic/)

![02 思路示意图](https://s1.ax1x.com/2022/05/17/OIt3SU.png)

## 代码实现

```ts
//方法: Map   时间复杂度 O(n^2)；空间负责度 O(n)
function numberOfBoomerangs(points: number[][]): number {
  let res = 0;

  for (let p1 of points) {
    let distanceMap = new Map();
    for (let p2 of points) {
      //S1 记录 b点和当前a点之间的距离，为了避免key为浮点数，所以不开平方根
      let distanceKey = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
      let pre = distanceMap.get(distanceKey) || 0;
      distanceMap.set(distanceKey, pre + 1);
    }
    // S2 当value值大于2时，说明有>=2个其他点，到a点的距离是相等的
    for (let value of distanceMap.values()) {
      if (value >= 2) {
        res += value * (value - 1);
      }
    }
  }

  return res;
}
```
