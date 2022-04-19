# LeetCode141 - 环形链表

# 题目描述

给定一个链表，判断链表中是否有环。

示例 1：
```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

示例 2：
```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

## 参考文档

[01 快慢指针思想](https://github.com/CyC2018/CS-Notes/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3%20-%20%E5%8F%8C%E6%8C%87%E9%92%88.md)

[02 JS其他解决方法参考](https://leetcode-cn.com/problems/linked-list-cycle/solution/javascript-huan-xing-lian-biao-by-rhinoc/)


## 思维技巧

![快慢指针法训练](https://s1.ax1x.com/2020/06/08/tWKGsU.png)


## 代码实现

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {

  if (!head || !head.next) return false

  let slow = head, fast = head.next
  while (slow && fast && fast.next) {
    if (slow == fast) return true
    slow = slow.next
    fast = fast.next.next
  }

  return false
};
```