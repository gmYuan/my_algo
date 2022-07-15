
# LeetCode82- 删除排序链表中的重复元素II

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/solution/tong-yong-shan-chu-zhong-fu-jie-dian-lia-od9g/)

[02 方法2参考](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/solution/fu-xue-ming-zhu-di-gui-die-dai-yi-pian-t-wy0h/)

## 代码实现

方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let dummyHead = new ListNode()
  dummyHead.next = head
  // tail是 结果链表的尾节点
  let tail = dummyHead
  // cur指向 遍历输入链表过程中的当前节点
  let cur = head
     
  while (cur) {
    // 保证只有cur是非重复节点，才会加入到tail链表中
    if (!cur.next || cur.val !== cur.next.val) {
      tail.next = cur
      tail = tail.next
    }
    // 只要当前节点是重复的，就一直让它移动到 最后一个重复节点
    while (cur.next && cur.val === cur.next.val) {
      cur = cur.next
    }

    cur = cur.next
  }

  //易错点：如果原链表都是重复节点，当cur循环结束后，虽然cur指向了 原链表最后一个节点
  // 但是tail一直没有执行更新逻辑，所以默认会指向原链表的头节点
  // 为了避免这种情况 + 保持循环不变量的定义，需要切断tail之后的节点
  tail.next = null
  return dummyHead.next
};
```


方法2: 递归实现，时间复杂度 O(n)  空间复杂度O(n)
```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head
  }
  // 递归定义: 删除以head作为开头的有序链表中，所有 值重复的节点
  if (head.val === head.next.val) {
    let newHead = head.next
    while (newHead && head.val == newHead.val) {
      newHead = newHead.next
    }
    return deleteDuplicates(newHead)
  } else {
    head.next = deleteDuplicates(head.next)
  }
  return head
};
```