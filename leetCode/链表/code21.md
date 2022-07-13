
# LeetCode21- 合并两个有序链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/merge-two-sorted-lists/solution/xin-shou-you-hao-xue-hui-tao-lu-bu-fan-cuo-4nian-l/)

[02 方法2参考](https://leetcode.cn/problems/merge-two-sorted-lists/solution/chao-xiang-xi-tu-jie-di-gui-zhi-xing-guo-cheng-21h/)

## 代码实现
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(-1)
  let p1 = list1
  let p2 = list2
  let p3 = dummyHead
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1
      p1 = p1.next
    } else {
            p3.next = p2
            p2 = p2.next
        }
        p3 = p3.next
    }
    p3.next = p1 ? p1: p2
    return dummyHead.next
};
```

