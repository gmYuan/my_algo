# LeetCode219- 存在重复元素 II

## 图示

[01 思路参考](https://leetcode.cn/problems/contains-duplicate-ii/solution/hua-jie-suan-fa-219-cun-zai-zhong-fu-yuan-su-ii-by/)

## 代码实现

```ts
//方法: Map   时间复杂度 O(n)；空间复杂度 O(k)
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  let slideMap = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (slideMap.has(nums[i])) {
      return true;
    }
    slideMap.add(nums[i]);
    // 滑动窗口，保持 slideMap.size() <= k
    if (slideMap.size > k) {
      slideMap.delete(nums[i - k]);
    }
  }
  return false;
}
```
