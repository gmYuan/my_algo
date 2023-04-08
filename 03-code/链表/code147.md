
# LeetCode147- 对链表进行插入排序

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/insertion-sort-list/solution/wei-tu-jie-147dui-lian-biao-jin-xing-cha-ru-pai-xu/)


## 代码实现

方法1: 虚拟头节点，时间复杂度 O(n^2)  空间复杂度O(1)

```ts
function insertionSortList(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(0)
  dummy.next = head
  // cur指向当前已排好序链表[left, right]的 right节点
  let cur = head;
  let pre = dummy
  while (cur && cur.next) {
    if (cur.val <= cur.next.val) {
      cur = cur.next
    } else {
      // S1 确定将要插入的节点
      let willInsert = cur.next
      // S2 在原链表中 删掉这个待插入节点
      cur.next =  cur.next.next

      // S3 遍历找到 待插入节点的位置
      // pre 表示已排好序的链表中, willInsert的前一个节点
      pre = dummy
      while (pre.next.val <= willInsert.val) {
        pre = pre.next
      }
      // S4 插入节点
      let temp = pre.next
      pre.next = willInsert
      willInsert.next = temp
    }
  }
  return dummy.next
};
```