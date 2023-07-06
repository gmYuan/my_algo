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
  // 处理特殊情况
  if (!head || !head.next) return head

  //S1 设置虚拟头节点
  let dummy = new ListNode(-1, head)

  //S2 获取链表长度，用于明确 归并的截止长度
  let len = getLinkLen(head)

  //S3 分别以 1/2/4/8/k个节点为 1节车厢 + 对车厢(a, b)两两配对，进行排序
  for (let step = 1; step < len; step *= 2) {
    let pre = dummy;   // pre固定指向 每轮循环中的 每对配对车厢(a,b)中的 a1的前一个节点
    let cur = dummy.next; // cur固定指向每轮循环中的 每对配对车厢(a,b)中的 a1节点
    while (cur) {       
      let a1 = cur;           // 获取a车厢的 头节点a1
      let b1 = cut(a1, step); // 根据a1 + step, 得到b车厢的 头节点b1
      cur = cut(b1, step);    // 更新cur为下一对车厢的头结点a2, 同时隐式切断了b1的尾节点
      // 更新pre, 以保证pre指向为 下一对车厢(a2, b2)中 a2的前一个节点
      pre.next = merge(a1, b1);
      while (pre.next) {
        pre = pre.next;
      }
    }
  }
  return dummy.next;
};

// 获取到link长度
function getLinkLen(head: ListNode) {
  let res = 0
  while (head) {
    head = head.next
    res += 1
  }
  return res
}

// 在移动n个节点后， 切断以head开头的链表的最后一个节点，返回切断后的头节点
function cut(head: ListNode, n: number) {
  if (!head) return head
  let dummy = new ListNode(-1, head)
  let cur = dummy;
  // 易错点: 要保证cur.next不为null, 以保证cur不会移动到null的情况
  while (cur.next && n > 0) {
    cur = cur.next;
    n--
  }
  let temp = cur.next;
  cur.next = null;
  return temp;
}
    
// 合并 l1和l2 2个有序链表
function merge(l1: ListNode, l2: ListNode) {
  let dummy = new ListNode(-1)
  // 易错点: 为了返回头节点，需要要有新对象cur，用于后移指针
  let cur = dummy
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 ? l1 : l2
  return dummy.next
}


// 输出打印
const l1 = listToLink([4, 2, 1, 3]);
const res = sortList(l1);
printedLink(res);
