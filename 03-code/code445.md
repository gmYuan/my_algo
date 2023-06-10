
# LeetCode445- 两数相加 II

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/add-two-numbers-ii/solution/liang-shu-xiang-jia-ii-by-leetcode-solution/)

## 代码实现
```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// 方法1: 栈 + 指针更新  时间复杂度 O(max(m, n))  空间复杂度：O(m+n)
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let carry = 0
  let stack1 = []
  let stack2 = []
  let res = null
  while (l1) {
      stack1.push(l1.val)
      l1 = l1.next
  }
  while (l2) {
      stack2.push(l2.val)
      l2 = l2.next
  }
  while (stack1.length || stack2.length || carry) {
      let v1 = stack1.pop() 
      let v2 = stack2.pop()
      let curNode = curAddNode(v1, v2)
      // 让当前高位节点，指向之前的低位节点
      curNode.next = res
      res = curNode
  }
  return res

  // 辅助函数
  function curAddNode(v1 = 0, v2 = 0) {
    let sum = v1 + v2 + carry
    let val = sum % 10
    carry = Math.floor( sum / 10)
    return new ListNode(val)
  }
};
```

