# LeetCode75- 颜色分类

## 实现思路

1 关键特征：重复的【有限成员】; 排序

2 方法1:  首尾指针 + 循环不变量

3 参考实现: <br/>
[类似实现思路](https://leetcode.cn/problems/sort-colors/solution/kuai-su-pai-xu-partition-guo-cheng-she-ji-xun-huan/)


## 代码实现

方法1: 首尾指针法——  时间复杂度: O(n); 空间复杂度: O(1)

```ts
function sortColors(nums: number[]): void {
  // [0, front]都是0，[front+1, i-1]都是1, [tail, nums.length - 1]都是2
  let front = -1, tail = nums.length
  for (let i = 0; i < tail;) {
    const val = nums[i]
    if (val === 1) {
      i++
    } else if (val === 0) {
      swap(nums, ++front, i++)
    } else {
      swap(nums, i, --tail)
    }
  }
};

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```

用一张图理解过程为: <br/>
![流程图](./code75%E7%A4%BA%E6%84%8F%E5%9B%BE.png)