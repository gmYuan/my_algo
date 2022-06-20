
# LeetCode83- 删除排序链表中的重复元素

## 图示

[01 所有方法参考](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/solution/83-shan-chu-pai-xu-lian-biao-zhong-de-zhong-fu-21/)

## 代码实现

```ts
// 方法1: 快慢指针
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
function deleteDuplicates(head: ListNode | null): ListNode | null {
  let dummyNode = new ListNode(-99999)
  dummyNode.next = head
  let slow = dummyNode
  let fast = dummyNode.next
  while (fast) {
    if (slow.val === fast.val) {
      slow.next = fast.next
    } else {
      slow = slow.next
    }
    fast = fast.next
  }
  return dummyNode.next
};
```


```ts
// 方法2: 递归实现
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head   
    // 递归定义：删除了重复节点后的链表，并返回了头节点
    head.next = deleteDuplicates(head.next)
    // 比较当前head的值和删除重复后的链接头值是否相等
    return head.val === head.next.val ? head.next : head
};
```