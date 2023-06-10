
# LeetCode143- 重排链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/reorder-list/solution/dong-hua-yan-shi-kuai-man-zhi-zhen-143-z-4kmk/)

[02 方法2参考]()

## 代码实现

方法1: 中点反转法  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return
  // 找到中点
  let mid = getMid(head)
  let h1 = head
  let h2 = mid.next
  // 断开链表
  mid.next = null
  // 反转右半部分链表
  let newH2 = reverse(h2)
  // 连接左右部分的链表
  merge(h1, newH2)
};

function getMid(head: ListNode) {
  let slow = head
  let fast = head
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

function reverse(head: ListNode) {
  let pre = null
  let cur = head
  while (cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
}

function merge(l1: ListNode, l2: ListNode) {
  let temp1, temp2
  while (l1 && l2) {
    // 暂存下一个节点
    temp1 = l1.next
    temp2 = l2.next
    // 连接 + 更新
    l1.next = l2
    l1 = temp1
    // 连接 + 更新
    l2.next = l1
    l2 = temp2
  }
}
```

方法2: 回溯法

```ts

```

