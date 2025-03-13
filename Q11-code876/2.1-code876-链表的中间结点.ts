/**
给你单链表的头结点 head ，请你找出并返回 链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

示例 1：
输入：head = [1,2,3,4,5]
输出：[3,4,5]
解释：链表只有一个中间结点，值为 3


示例 2：
输入：head = [1,2,3,4,5,6]
输出：[4,5,6]
解释：该链表有两个中间结点，值分别为 3 和 4 ，返回第二个结点
*/


/**
*/

// 返回 中间节点链表的 头节点
function middleNode(head) {s
  if (!head || !head.next) return head;
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow  
};