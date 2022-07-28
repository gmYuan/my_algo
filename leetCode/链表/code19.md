
# LeetCode19- 两数相加 II

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/solution/shan-chu-lian-biao-de-dao-shu-di-nge-jie-dian-b-61/)

[02 方法2参考](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/solution/san-chong-fang-fa-shan-chu-dao-shu-di-nge-jie-dian/)

## 代码实现

方法1: 快慢指针  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return head
  let dummy = new ListNode(-1)
  dummy.next = head
  let slow = dummy
  let fast = dummy.next
  for (let i = 0; i < n; i++) {
    fast = fast.next
  }
  //S1 找到待删除节点的 前一个节点，此时 fast指向null
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  //S2 删除节点
  slow.next = slow.next.next
  return dummy.next
};
```

方法2: 回溯法

```ts
let count: number
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head)  {
    count = 0
    return head
  }
  head.next = removeNthFromEnd(head.next, n)
  count += 1
  return count === n ? head.next : head
};
```

