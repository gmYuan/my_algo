# LeetCode215- 数组中的第K个最大元素

## 实现思路

方法1: 双路快排 + 二分剪枝

方法2: 优先队列，待完善


参考实现:  <br/>
[01 官方参考实现](https://leetcode.cn/problems/kth-largest-element-in-an-array/solutions/307351/shu-zu-zhong-de-di-kge-zui-da-yuan-su-by-leetcode-/)



## 代码实现

方法1: 双路快排 + 二分剪枝   时间复杂度: O(n)  空间复杂度: O(log⁡n)

```ts
function findKthLargest(nums: number[], k: number): number {
  const len = nums.length
  // 降序排列，则第k大对应的idx是k-1; 升序排列，则第k大对应的idx是len-k
  return quickFind(nums, 0, len-1 , len-k);
};

// tdx: 即targetIndex，通过比较p和tdx，从而进行二分剪枝
function quickFind(nums, left, right, tdx){
  if(left === right) return nums[left];
  const p = partition(nums, left, right);
  // 找到目标索引，直接返回其值即可
  if(p === tdx) return nums[p];
  // 否则，进行二分剪枝
  if(tdx < p) {
    return quickFind(nums, left, p-1, tdx);
  } else {
    return quickFind(nums, p+1 , right, tdx);
  }
}

// 把某一base元素值，放到其正确排序位置上，并返回其位置索引
function partition(nums, left, right){
  const rdx = Math.floor(Math.random() * (right - left + 1)) + left
  swap(nums, left, rdx);
  // 双路快排的partiton过程: [left+1, front-1] <= base, [tail+1, right] >= base
  let base = nums[left]
  let front = left + 1, tail = right
  while (front <= tail) {
    while (nums[front] < base) front++
    while (nums[tail] > base) tail--
    if (front >= tail) break;

    // 保证了等于base的成员 被均分到了front/tail的各自范围内
    swap(nums, front++, tail--)
  }
  swap(nums, left, tail);
  return tail;
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}
```
