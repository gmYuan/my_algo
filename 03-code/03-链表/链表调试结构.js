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

let lastCount
function removeNthFromEnd(head, n) {
  if (!head)  {
    lastCount = 0
    return head
  }
  lastCount++
  return lastCount === n ? head.next : head
};



// 输出打印
const l1 = listToLink([1, 2, 3, 4, 5]);
const res = removeNthFromEnd(l1, 2);
printedLink(res);
