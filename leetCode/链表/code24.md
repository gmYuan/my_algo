
# LeetCode24- 两两交换链表中的节点

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/)

[02 方法2参考](https://leetcode.cn/problems/swap-nodes-in-pairs/solution/chao-qiang-gifzhu-ni-li-jie-shi-yong-di-gui-fa-qiu/)


## 代码实现

方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

```ts
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

function swapPairs(head: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(-1)
  dummyHead.next = head
  // 指向待交换的第1个节点的 前一个节点
  let pre = dummyHead
  // 指向待交换的第1个节点
  let p1 = dummyHead.next
  // 指向待交换的第2个节点
  let p2 = dummyHead.next?.next
  while (p1 && p2 ) {
    // 改变next指向内容
    let temp = p2.next
    pre.next = p2
    p2.next = p1
    p1.next = temp
    // 移动指针
    pre = p1
    p1 = temp
    p2 = temp?.next
  }
  return dummyHead.next
};
```


方法2: 递归实现，时间复杂度 O(n)  空间复杂度O(n)

```ts
function swapPairs(head: ListNode | null): ListNode | null {
  // 递归定义：返回 两两交换了位置的新链表的头节点
  if (!head || !head.next) return head;
  // 指向待交换的第1个节点, 这里只是为了便于理解，其实是个冗余变量
  let p1 = head;
  // 指向待交换的第2个节点
  let p2 = head.next;
  // 易错点：传入的是 p2.next，这样就可让递归单次处理对象是成对的 p1 + p2
  p1.next = swapPairs(p2.next);
  p2.next = p1 ;
  return p2;
};
```