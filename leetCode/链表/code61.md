# LeetCode61- 旋转链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/rotate-list/solution/bi-he-wei-huan-xuan-zhuan-lian-biao-by-d-3wj1/)

[02 方法2参考](https://leetcode.cn/problems/rotate-list/solution/shou-hui-man-hua-tu-jie-leetcodezhi-xuan-zhuan-lia/)

## 代码实现

方法1: 转化为环 + 步长切断  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next) return head
  let [length, cur] = getTailAndLength(head)
  // 形成环
  cur.next = head
  // 易错点: 确定截取的步长
  let step = length - (k % length)
  // 获取返回链表头节点的 前一个节点 + 同时切断了环
  while (step--) {
    cur = cur.next
  }
  let res = cur.next
  cur.next = null
  return res
};

function getTailAndLength(head: ListNode): [number, ListNode] {
  let cur = head
  let length = 1
  while (cur.next) {
    cur = cur.next
    length++
  }
  return [length, cur]
}
```

方法2: 快慢指针 + 连环切断  时间复杂度: O(n)  空间复杂度: O(1)

```ts
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next) return head
  let slow = head, fast = head
  let length = getLength(head)
  // 缩小 + 确定要移动的节点个数
  k = k % length
  // 让fast-slow = k个间隔节点
  // 这样当fast移到最后时,slow就移到了 倒数k个节点的前一个位置
  while (k--) {
    fast = fast.next
  }
  while(fast.next) {
    slow = slow.next
    fast = fast.next
  }
  // 重新连接节点指向
  fast.next = head
  head = slow.next
  slow.next = null
  // 返回新的头节点
  return head
};

function getLength(head: ListNode) {
  let length = 1
  while (head.next) {
    head = head.next
    length++
  }
  return length
}
```