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
// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]

function sortList(head: ListNode | null): ListNode | null {
  function sortList(head: ListNode | null): ListNode | null {
    // dummy + len + (step >> 1) + (a1,b1) + (pre & cur) + cut + merge
    if (!head || !head.next) return head;
    // S1 dummy
    let dummy = new ListNode(-1, head);
    // S2 len
    const len = getLinkLen(head);
    // S3 step
    for (let step = 1; step < len; step *= 2) {
      // S4 pre & cur
      let pre = dummy; // pre: 每轮(a,b)中 a的前一个节点
      // 易错点2: cur不能指向head
      let cur = dummy.next; // cur: 每轮(a,b)中 a
      // 易错点1：需要保证cur有值
      while (cur) {
        // S5 a1 & b1
        const a1 = cur; // 当前一对车厢(a,b)中 a的头结点
        const b1 = cut(a1, step); // 当前一对车厢(a,b)中 b的头结点
        cur = cut(b1, step); // cur指向 下一对车厢(a2, b2)中 a的头结点
        // S6 merge
        pre.next = merge(a1, b1);
        while (pre.next) {
          pre = pre.next;
        }
      }
    }
    return dummy.next;
  }
}

function getLinkLen(head) {
  let res = 0;
  while (head) {
    res += 1;
    head = head.next;
  }
  return res;
}

// 对以head为头结点的链表，截断前n个节点，返回截断后的新头节点
function cut(head, n) {
  if (!head) return head;
  let dummy = new ListNode(-1, head);
  let pre = dummy;
  while (pre.next && n > 0) {
    pre = pre.next;
    n--;
  }
  let temp = pre.next;
  pre.next = null;
  return temp;
}

function merge(l1, l2) {
  let dummy = new ListNode(-1);
  let pre = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      pre.next = l1;
      l1 = l1.next;
    } else {
      pre.next = l2;
      l2 = l2.next;
    }
    pre = pre.next;
  }
  pre.next = l1 ? l1 : l2;
  return dummy.next;
}

// 输出打印
const l1 = listToLink([4, 2, 1, 3]);
const res = sortList(l1);
printedLink(res);
