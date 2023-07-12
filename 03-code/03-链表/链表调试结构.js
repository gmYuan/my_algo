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
// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]


function removeNthFromEnd(head, n) {
  let dummy = new ListNode(-1, head)
  let slow = dummy, fast = dummy
  // 根据n + 快满指针 形成的滑动窗口==> 当fast为null时，slow为待删除节点的 前一个节点
  for (let i = 0; i < n + 1; i++) {
    fast = fast.slow
  }
  while (fast) {
    slow = slow.next 
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next

}



// 输出打印
const l1 = listToLink([1, 2, 3, 4, 5]);
const res = removeNthFromEnd(l1, 2);
printedLink(res);
