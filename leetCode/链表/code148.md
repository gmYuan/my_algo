
# LeetCode148- 排序链表

## 图示参考

[01 方法1图示参考](https://leetcode.cn/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/)

[02 方法1代码参考](https://leetcode.cn/problems/sort-list/solution/pai-xu-lian-biao-di-gui-die-dai-xiang-jie-by-cherr/)


## 代码实现

方法1: 自底向上归并排序，时间复杂度 O(n * logn)  空间复杂度O(1)

```ts
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  //S1 设置虚拟头节点
  let dummy = new ListNode(-1)
  dummy.next = head

  //S2 获取链表长度，用于明确 归并的截止长度
  let linkLength = getLinkLength(head)

  //S3 分别以 1/2/4/8/k个节点为 1节车厢 + 对车厢(a,b)两两配对，进行排序
  for (let step = 1; step < linkLength; step*=2) {
    let sorted = dummy;   // sorted固定指向 每次循环中的已排好序的 最后一个尾节点
    let cur = dummy.next; // cur固定指向每次循环中的 每对配对车厢中的a
    while (cur) {       
      let a1 = cur;
      let b1 = cut(a1, step); //根据a1, 得到b车厢的头节点
      cur = cut(b1, step);   // 更新cur,同时隐式切断了b1的尾节点
      sorted.next = merge(a1, b1);
      while (sorted.next) {
        sorted = sorted.next;
      }
    }
  }
  return dummy.next;
};

// 获取到link长度
function getLinkLength(head: ListNode) {
  let res = 0
  while (head) {
    head = head.next
    res += 1
  }
  return res
}

// 在移动step个节点后， 切断以head开头的链表的最后一个节点，返回切断后的头节点
function cut(head: ListNode, step: number) {
  if (!head) return head
  let cur = head;
  for(let i=1; i < step && cur.next; i++){
    cur = cur.next;
  }
  let temp = cur.next;
  cur.next = null;
  return temp;
}
    
// 合并 l1和l2 链表
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