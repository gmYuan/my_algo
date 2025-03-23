/**

给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。

请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。


示例 1:
输入: head = [1,2,3,4,5]
输出: [1,3,5,2,4]

示例 2:
输入: head = [2,1,3,5,6,4,7]
输出: [2,3,6,7,1,5,4]
*/


// 方法1.1- 间隔移动
function oddEvenList1(head) {
  if (!head || !head.next) return head;
  let p1Head = head, p2Head = head.next;
  let p1 = head, p2 = head.next;
  // 能同时支持奇数和偶数的情况
  while (p1.next && p2.next) {
    p1.next = p1.next.next;
    p2.next = p2.next.next
    p1 = p1.next
    p2 = p2.next
  }
  p1.next = p2Head;
  return p1Head;
}


// 方法1.2- 交替移动
function oddEvenList(head) {
  if (!head || !head.next) return head;
  let p2Head = head.next
  let p1 = head, p2 = head.next;
  // p2不为null 保证了奇数个数 正确终止的情况
  // p2.next不为null 保证了偶数个数时 p1不会错误指向最后1个奇数的 后一位null的情况
  while (p2 && p2.next) {
    p1.next = p2.next
    p1 = p1.next
    p2.next = p1.next
    p2 = p2.next
  }
  p1.next = p2Head;
  return head;
}