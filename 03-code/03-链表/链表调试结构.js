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
// 输入：head = [1,2,2,1]
// 输出：true

function sortList(head) {
  if (!head  || !head.next) return head;
  let pivot = head.val;
  let small = new ListNode(), large = new ListNode();
  let hSmall = small, hLarge = large, cur = head.next;
  while (cur) {
    let val = cur.val;
    if (val < pivot) {
      small.next = cur;
      small = small.next;
    } else {
      large.next = cur;
      large = large.next;
    }
    cur = cur.next;
  }
  large.next = null;
  small.next = head;
  head.next = null;
  small = sortList(hSmall.next);
  large = sortList(hLarge.next);
  head.next = large;
  return small;
}

// 输出打印
const l1 = listToLink([2,1,5,3]);
const res = sortList(l1);
printedLink(res);


