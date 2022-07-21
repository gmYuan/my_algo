
# LeetCode25- K个一组翻转链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/reverse-nodes-in-k-group/solution/k-ge-yi-zu-fan-zhuan-lian-biao-by-leetcode-solutio/)

[02 方法2参考]()


## 代码实现

方法1: 虚拟头节点，时间复杂度 O(n)  空间复杂度O(1)

```ts
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let dummy = new ListNode(-1)
  dummy.next = head
  // 待移动链表的头节点的 前趋节点
  let pre = dummy

  while (head) {
    //S1 找到 待移动链表的尾节点的 正确位置
    let tail = pre
    for (let i = 0; i < k; i++) {
      tail = tail.next
      // 如果提前不存在tail，则说明剩下的节点不足1组，直接返回即可
      if (!tail) return dummy.next;
    }
    // S2 定位后继节点的位置
    let successor = tail.next;
    // S3 反转[head,tail]间的链表
    let [newHead, newTail] = reverseBetween(head, tail)

    // S4 连接链表
    pre.next = newHead
    newTail.next = successor

    // S5 更新指针，维持循环不变量
    pre = newTail
    head = newTail.next
  }

  return dummy.next;
};

function reverseBetween(head, tail) {
  let pre = tail.next
  let cur = head
  while (pre !== tail) {
    let successor = cur.next
    cur.next = pre
    pre = cur
    cur = successor
  }
  return [tail, head]
}
```


方法2: 递归实现，时间复杂度 O(n)  空间复杂度O(n)

```ts

```