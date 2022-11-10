
# LeetCode21- 合并两个有序链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/merge-two-sorted-lists/solution/xin-shou-you-hao-xue-hui-tao-lu-bu-fan-cuo-4nian-l/)

[02 方法2参考](https://leetcode.cn/problems/merge-two-sorted-lists/solution/chao-xiang-xi-tu-jie-di-gui-zhi-xing-guo-cheng-21h/)

## 代码实现

方法1: 虚拟头节点，时间复杂度 O(m+n)  空间复杂度O(1)

```ts
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let dummy = new ListNode(-1)
  let p1 = list1
  let p2 = list2
  // 用P3来移动结果链表 的当前指针，从而更新结果链表
  let p3 = dummy
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
  return dummy.next
};
```


方法2: 递归实现，时间复杂度 O(m+n)  空间复杂度O(m+n)
```ts
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (list1 === null) return list2
  if (list2 === null) return list1
  if (list1.val <= list2.val){
    // 递归定义：合并2个有序链表后，返回新的头节点
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
}
```