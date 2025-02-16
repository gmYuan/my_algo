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

// 总结出这道题涉及的思维技巧，我怎么做到在长时间不做这一道题后，还能再想起来怎么做

/**
自顶向下思维技巧：

1 归并排序的步骤：
  - 把数据分成两半：找到中点并分割==> 快慢指针
  - 对每一半 递归排序==> 中序递归
  - 合并两个有序序列==> 合并两个有序链表


2 链表中点切割==> 快慢指针
  - 不完全平均的分割 并不影响算法的正确性，因为 递归会持续分割 直到不能再分
  - 即 从正确性角度：任意位置切割都可以
  - 但是从性能角度：中点附近切割→ O(n log n)，随机位置切割→ 最坏是 O(n^2)

 */

function sortList(head) {
  if (!head || !head.next) return head;
  // 获取中点 + 分割链表==> 快慢指针
  let slow = head, fast = head, mid = null;
  while (fast && fast.next) {
    mid = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  slow.next = null;
  // 中序递归
  const l1 = sortList(head);
  const l2 = sortList(mid);
  // 合并链表
  return merge(l1, l2);
}
