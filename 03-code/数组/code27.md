# LeetCode27- 移除元素

## 实现思路

1 快慢指针; 循环不变量
2 交换/赋值 优化

参考实现:


## 代码实现

方法1: 快慢指针  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function removeElement(nums: number[], val: number): number {
  // [0, slow)为非目标内容 [slow, i]为目标元素
  // 之所以slow为开区间，是因为有可能原数组第一个元素就是目标元素
  let slow = 0, length = nums.length
  if (length < 1) return length
  for (let i = 0; i < length; i++) {
    if (nums[i] !== val) {
      if (slow !== i) {
        nums[slow++] = nums[i]
      } else {
        slow++
      }    
    }
  }
  return slow
};
```