
# LeetCode148- 排序链表

1 思维关键词: 

S2 递归法: getMid(slow + fast) +  递阶段拆分 + 归阶段排序(merge)

S3 快排法：中序递归法

2 参考文档

[02 方法1&2代码参考](https://leetcode.cn/problems/sort-list/solution/pai-xu-lian-biao-di-gui-die-dai-xiang-jie-by-cherr/)

[03 快排实现参考](https://leetcode.cn/problems/sort-list/solution/tie-yi-ge-kuai-su-pai-xu-de-dai-ma-mian-36ay1/)


## 代码实现



2 方法2: 自顶向下 归并排序，时间复杂度 O(n * logn)  空间复杂度O(logn)
```ts

function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  // 递归定义: 二分链表后 + 进行排序
  // 递：二分链表； 归：返回已经排序好的链表
  let slow = head, fast = head.next
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  // temp指向 二分后的右侧链表头节点
  let temp = slow.next
  // 切断左半部分的链表尾节点
  slow.next = null
  // 继续向下递- 拆分链表
  let l1 = sortList(head)
  let l2 = sortList(temp)

  // 归阶段：合并2个链表
  return merge(l1, l2)
}

function merge(l1: ListNode, l2: ListNode) {
  let dummy = new ListNode()
  let cur = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) {
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
```


3 方法3 快排实现  均摊时间复杂度 O(n * logn)  空间复杂度O(logn)

```ts
function sortList(head: ListNode | null): ListNode | null {
  if (!head  || !head.next) return head;
  // 每轮递归，都需要定义pivot + small + large部分
  let pivot = head.val;
  let small = new ListNode(), large = new ListNode();
  let hSmall = small, hLarge = large, cur = head.next;
  // S1 拼接small和large部分的链表
  while (cur) {
    let val = cur.val;
    if (val < pivot) {
      small.next = cur;
      small = small.next;
    } else {
      large.next = cur;
      large = large.next;
    }
    cur = cur.next;
  }
  // S2 切换large尾节点 + 切断head尾节点 + 设置small下一个节点为当前head
  large.next = null;
  head.next = null;
  small.next = head;
  // S3 递归排序small和large部分
  small = sortList(hSmall.next);
  large = sortList(hLarge.next);
  // S4 让head.next指向排好序的large部分
  head.next = large;
  // S5 返回排好序的small部分
  return small;
}
```