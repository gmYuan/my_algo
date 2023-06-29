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

function oddEvenList(head: ListNode | null): ListNode | null {
	if (!head || !head.next) return head
  // S1 子问题
	let [oddHead, evenHead] = temp(head, head.next)
	let oddTail = oddHead
	while (oddTail) {
		oddTail = oddTail.next
	}
	oddTail.next = evenHead
	return head
}

// odd-->odd; even-->even; 返回分类好的 [oddHead, evevHead]
function temp(odd, even)  {
	if (!odd.next || !even.next) {
		return [odd, even]
	}
	let [newOddHead, newEvenHead] = temp(odd.next.next, even.next.next)
	odd.next = newOddHead
	even.next = newEvenHead
	return [odd, even]
}
// 输入：head = [1,2,3,4,5]
// 输出：[1,3,5,2,4]

const head = listToLink([1, 2, 3, 4, 5]);
printedLink(head);
const newLink = oddEvenList(head, 2, 4);
printedLink(newLink);
