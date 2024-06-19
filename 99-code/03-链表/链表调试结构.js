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
function removeElements(head, val) {
  if (!head) return null;
  if (head.val === val) {
    return removeElements(head.next, val)
  } else {
    head.next = removeElements(head.next, val)
  }
  return head
}

// 输出打印
const l1 = listToLink([7, 7, 7, 7]);
const res = removeElements(l1);
printedLink(res);
