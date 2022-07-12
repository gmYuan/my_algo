
# LeetCode86- 分隔链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/partition-list/solution/liang-ge-dummyran-hou-pin-jie-by-powcai/)

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

function partition(head: ListNode | null, x: number): ListNode | null {
  let dummy1 = new ListNode(-1)
  let dummy2 = new ListNode(-1)
  let curP1 = dummy1
  let curP2 = dummy2
  if (!head || !head.next) {
    return head
  }
  while(head) {
    if (head.val < x) {
      curP1.next = head
      curP1 = curP1.next
    } else {
      curP2.next = head
      curP2 = curP2.next
    }
    head = head.next
  }

  curP1.next = dummy2.next
  curP2.next = null
  return dummy1.next
}
```

