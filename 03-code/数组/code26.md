# LeetCode26- 删除有序数组中的重复项

## 实现思路

1 快慢指针; 循环不变量
2 交换优化


## 代码实现

方法1: 快慢指针  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function removeDuplicates(nums: number[]): number {
  //循环不变量目标: [0, slow]都是非重复元素
  let slow = 0
  const length = nums.length
  if (length <= 1) return length
  for (let i = 1; i < length; i++) {
    // 当前是重复元素,则不更新slow, 继续更新i即可
    // 只有非重复元素，才需要更新slow边界
    if (nums[slow] !== nums[i]) {
      // 1个优化手段，避免一开始不重复的成员进行多余的交换操作
      if (slow + 1 === i) {
        ++slow
      } else {
        swap(nums, ++slow, i)
      } 
    }
  }
  return slow+1
};

function swap(arr: any[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```