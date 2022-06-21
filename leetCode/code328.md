
# LeetCode328- 奇偶链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/odd-even-linked-list/solution/shou-hua-tu-jie-328qi-ou-lian-biao-odd-even-linked/)

[02 方法2参考](https://leetcode.cn/problems/odd-even-linked-list/solution/qi-ou-lian-biao-java-di-gui-jie-fa-by-cthitting/)


## 代码实现

```ts
// 方法1: 快慢指针
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
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  let curOdd = head
  let curEven = head.next
  // 技巧1: 使用变量，保存最开始的快节点的 头节点
  let evenHead = head.next
  while (curEven && curEven.next) {
    // 易错点1: 保证curEven.next有值，从而确保curOdd节点指向不为空
    curOdd.next = curEven.next
    curOdd = curOdd.next
    // 技巧2: 更新奇节点后，再交替更新偶节点指向就不会错
    curEven.next = curOdd.next
    curEven = curEven.next
  }
  // 连接快慢链表
  curOdd.next = evenHead
  return head
}
```


```ts
// 方法2: 递归实现
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  // 初始偶数索引节点
  let evenHead = head.next
  // 递归定义：让 以odd和even为开头的 链表，变成odd和odd相连，even和even相连，//                并返回最后一个odd
  const DFS = (odd: ListNode, even: ListNode) => {
    // 易错点1：要确保odd和even不为空
    if (!odd.next || !odd.next.next) {
      return odd
    }
    odd.next = even.next
    even.next = odd.next.next
    return DFS(odd.next, even.next)
  }
  const oddTail = DFS(head, head.next)
  // 连接初始偶数节点，因为之后的偶数节点已经被相连了
  oddTail.next = evenHead
  return head
}
```