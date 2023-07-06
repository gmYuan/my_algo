
# LeetCode148- 排序链表

1 思维关键词: 

S1 迭代法: dummy + genLinkLen() + step>>1 +  (a,b) && cut() && pre + cur

S2 递归法: getMid(slow + fast) +  递阶段拆分 + 归阶段排序(merge)

2 参考文档

[01 方法1图示参考](https://leetcode.cn/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/)

[02 方法1&2代码参考](https://leetcode.cn/problems/sort-list/solution/pai-xu-lian-biao-di-gui-die-dai-xiang-jie-by-cherr/)


## 代码实现

1 方法1: 自底向上归并排序，时间复杂度 O(n * logn)  空间复杂度O(1)

```ts
function sortList(head: ListNode | null): ListNode | null {
  // 处理特殊情况
  if (!head || !head.next) return head

  //S1 设置虚拟头节点
  let dummy = new ListNode(-1, head)

  //S2 获取链表长度，用于明确 归并的截止长度
  let len = getLinkLen(head)

  //S3 分别以 1/2/4/8/k个节点为 1节车厢 + 对车厢(a, b)两两配对，进行排序
  for (let step = 1; step < len; step *= 2) {
    let pre = dummy; // pre固定指向 每轮循环中的 每对配对车厢(a,b)中的 a1的前一个节点
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
```

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