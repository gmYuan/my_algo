# LeetCode283- 移动零

## 实现思路

1 同向双指针法(快慢指针法)
2 swap + 循环不变量/partition思想

参考实现:
[双指针法](https://leetcode.cn/problems/move-zeroes/solution/dong-hua-yan-shi-283yi-dong-ling-by-wang_ni_ma/)


## 代码实现

方法1: 显式同向双指针法  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function moveZeroes(nums: number[]): void {
  // [0, slow]都是非0元素；[fast, length-1]都是0元素
  let slow = 0, fast = 1, length = nums.length
  while(slow < length && fast < length) {
    let slowVal = nums[slow]
    let fastVal = nums[fast]
    if (slowVal === 0 && fastVal !== 0) {
      swap(nums, slow, fast)
      slow++
      fast++
    } else if (slowVal === 0 && fastVal === 0) {
      fast++
    } else if (slowVal !== 0 && fastVal === 0) {
      slow++
    } else if (slowVal !== 0 && fastVal !== 0) {
      slow++
      fast++
    }
  }
};

function swap(arr: any[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```

方法2: 隐式同向双指针法(推荐方法)  时间复杂度:O(n); 空间复杂度: O(1)

```ts
function moveZeroes(nums: number[]): void {
  //循环不变量目标: [0, slow)都是非0元素；[slow, i]都是0元素
  let slow = 0
  for (let i = 0; i < nums.length; i++) {
    // nums[i]如果为0，此时默认满足了[slow, i]都是0，继续查看下一个成员即可
    // nums[i]如果不为0，此时要把它交换到slow的位置处，从而满足[0, slow)都是非0元素
    if (nums[i] !== 0) {
      // 1个优化手段，可以防止一开始成员都不是0的时候，产生不必要的位置交换操作
      if (slow < i) {
        swap(nums, slow, i)
        slow++
      } else {
        slow++
      }
    }
  }
};

function swap(arr: any[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```
