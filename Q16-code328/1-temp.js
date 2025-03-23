// 方法1.2- 头插法

let successor = null;

function reverseBetween(head, left, right) {
  if (!head || !head.next) return head;
  if (left === 1) return reverseTopN(head, right);
  const newHead = reverseBetween(head.next, left - 1, right - 1);
  head.next = newHead;
  return head;
}

function reverseTopN(head, num) {
  if (num === 1) {
    successor = head.next;
    return head;
  }
  const newHead = reverseTopN(head.next, num - 1);
  head.next.next = head;
  head.next = successor;
  return newHead;
}
