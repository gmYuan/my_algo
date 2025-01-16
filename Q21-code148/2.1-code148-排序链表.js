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

function sortList(head: ListNode | null): ListNode | null {
  // 处理边界情况
  if (!head || !head.next) return head;

  // 获取链表长度
  let len = getLen(head);
  // 创建虚拟头节点
  const dummy = new ListNode(-1, head);

  // 自底向上归并排序
  // step表示每次归并的子链表长度，从1开始，每次翻倍
  for (let step = 1; step < len; step *= 2) {
    let pre = dummy;
    let cur = dummy.next;

    // 每次处理两个长度为 step的子链表
    while (cur) {
      // 1. 获取并分割第一个子链表
      let head1 = cur;
      let head2 = split(head1, step);

      // 2. 获取下一对子链表的起始位置
      cur = split(head2, step);

      // 3. 合并当前两个子链表，并连接到前面的链表
      pre.next = merge(head1, head2);

      // 4. 将pre移动到合并后的链表末尾
      while (pre.next) {
        pre = pre.next;
      }
    }
  }

  return dummy.next;
}

// 获取链表长度
function getLen(head) {
  let res = 0;
  while (head) {
    res++;
    head = head.next;
  }
  return res;
}

// 分割链表，返回第二部分的头节点
function split(head, n) {
  if (!head) return null;
  // 找到第n个节点
  for (let i = 1; i < n && head.next; i++) {
    head = head.next;
  }
  const second = head.next;
  head.next = null;
  return second;
}

// 合并两个有序链表
function merge(l1, l2) {
  const dummy = new ListNode(-1);
  let cur = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }

  cur.next = l1 || l2;
  return dummy.next;
}
