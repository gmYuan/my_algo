# LeetCode206- 反转链表

## 图示

[01 递归实现的宏观理解](https://labuladong.github.io/algo/2/17/17/)

[02 迭代/递归实现的微观理解](https://leetcode.cn/problems/reverse-linked-list/solution/dong-hua-yan-shi-206-fan-zhuan-lian-biao-by-user74/)


## 代码实现

```ts
//方法1: 迭代   时间复杂度 O(n)；空间复杂度 O(1)
function reverseList(head: ListNode | null): ListNode | null {
  let pre = null
  let cur = head
  while (cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
```

```ts
//方法2: 递归   时间复杂度 O(n)；空间复杂度 O(1)
function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
      return head
  }
  const originTail = reverseList(head.next)
  head.next.next = head
  head.next = null
  return originTail
}
```