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
快速排序- 自顶向下思维技巧：

1 快速排序-普遍性：
  - 确定pivot==> 随机/中点/首尾 位置
  - partition==> 把<=x的放左区间 + 把>=x的放右区间
  - 把 x 放到正确位置（左右分区的中间）
  - 递归快速排序左区间子序列 + 递归快速排序右区间子序列


2 链表快排-特殊性:
  - 无法随机访问元素，选择pivot通常使用 头节点/链表中点
  - 通过next指针而不是交换，来正确排序 链表节点
 */


function sortList(head) {
  if (!head || !head.next) return head
  // 1 确定pivot
  let pivot = head
  // 2.1 partition- 设定左右区间
  let smallH = 




  
}
