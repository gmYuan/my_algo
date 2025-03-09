/**
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 
示例 1：
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]


示例 2：
输入：head = [1,2]
输出：[2,1]

示例 3：
输入：head = []
输出：[]
*/

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


/**
*/

// 返回 反转后的链表头节点
function reverseList(head) {
  let pre = null, cur = head
  while (cur) {
    const willNext = cur.next
    // 修改当前指针指向前一个
    cur.next = pre
    // 移动pre和cur到下一个节点
    pre = cur
    cur = willNext
  }
  // 到最后pre指向的就是 原链表的最后一个节点
  return pre
}
