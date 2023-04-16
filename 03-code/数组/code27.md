# LeetCode27- 移除元素

## 实现思路

方法1: 快慢指针 & 循环不变量 + 交换/赋值 优化 （推荐方法）

方法2: 首尾指针 & 循环不变量

参考实现:

[官方实现](https://leetcode.cn/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode-solution-svxi/)


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
      if (slow === i) {
        slow++
      } else {
        nums[slow++] = nums[i]
      }    
    }
  }
  return slow
};
```

方法2: 首尾指针  时间复杂度:O(n); 空间复杂度: O(1)

```ts
// 该方法的优点是当成员都是非目标元素时，避免了冗余赋值
// 缺点是原数组返回值会乱序
function removeElement(nums: number[], val: number): number {
  let head = 0, tail = nums.length - 1
  if (tail < 0) return 0
  // [0, head]是非目标元素，[head+1,tail]是目标元素
  while (head <= tail) {
    if (nums[head] === val) {
      nums[head] = nums[tail--]
    } else {
      head++
    }
  }
  return head
}
```