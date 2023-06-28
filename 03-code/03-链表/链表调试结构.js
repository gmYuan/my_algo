class ListNode {
  constructor(val, next = null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function listToLink(arr) {
  let dummy = new ListNode(-1);
  let cur = dummy;
  for (let val of arr) {
    cur.next = new ListNode(val);
    cur = cur.next;
  }
  return dummy.next;
}

function printedLink(head) {
  let cur = head;
  let res = "";
  while (cur) {
    res += `${cur.val}-> `;
    cur = cur.next;
  }
  res += "Null";
  console.log(res);
  return res;
}

// 功能代码

// 递归: fn = f(n-1) + 本轮节点操作 ==> 规模缩小/子问题

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  // 递归中止条件: 规模缩小到不再保持原有函数性质的情况，一般是极限情况
  if (left === 1) {
    return reverseTopN(head, right);
  }
  // 拆解为规模更小的子问题
  let newHead = reverseBetween(head.next, left - 1, right - 1);
  head.next = newHead;
  return head;
}

// 反转链表的前n个节点，返回反转后的链表头节点
let topNSuccessor = null;
function reverseTopN(head, n) {
  if (n == 1) {
    topNSuccessor = head.next;
    return head;
  }
  let newHead = reverseTopN(head.next, n - 1);
  head.next.next = head;
  head.next = topNSuccessor;
  return newHead;
}

// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

const head = listToLink([1, 2, 3, 4, 5]);
printedLink(head);
const newLink = reverseBetween(head, 2, 4);
printedLink(newLink);
