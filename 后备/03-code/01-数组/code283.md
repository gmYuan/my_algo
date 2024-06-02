# LeetCode283- 移动零

## 实现思路

题目关键词: 0和非0元素; 保持相对顺序

思维关键词: 快慢指针 + 循环不变量 + 交换优化

参考实现: <br/>
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
    // nums[i]等于0时 [0,slow)不应该更新，让它保持原位不动
    // 非0时才应该放入并更新slow
    if (nums[i]) {
      // 优化手段，可以避免一开始成员都不是0时，不必要的交换操作
       if (slow === i) {
        slow++
       } else {
        swap(nums, slow++, i)
      }
    }
  }
};

function swap(arr: any[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```