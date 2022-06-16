# LeetCode92- 反转链表

## 图示

[01 头插法实现原理](https://leetcode.cn/problems/reverse-linked-list-ii/solution/java-shuang-zhi-zhen-tou-cha-fa-by-mu-yi-cheng-zho/)

[02 局部更新法实现原理](https://leetcode.cn/problems/reverse-linked-list-ii/solution/ji-bai-liao-100de-javayong-hu-by-reedfan-6/)

[03 递归实现原理](https://leetcode.cn/problems/reverse-linked-list-ii/solution/yi-bu-yi-bu-jiao-ni-ru-he-yong-di-gui-si-lowt/)


## 代码实现
```ts
// 实现方法1: 虚拟头节点 + 头插法
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  // S1 创建虚拟头节点
  let dummyHead = new ListNode(0)
  dummyHead.next = head
  // S2 定义循环不变量： beforeLeftNode 和  需要处理反转的开始节点
  let beforeLeftNode = dummyHead
  let leftNode = head
  for (let i = 0; i < left - 1; i++) {
    beforeLeftNode = beforeLeftNode.next
    leftNode = leftNode.next
  }
  //S3 循环 在beforeLeftNode后插入需要反转的节点
  for (let i = left; i < right; i++) {
    let removeNode = leftNode.next 
    leftNode.next = removeNode.next
    removeNode.next = beforeLeftNode.next
    beforeLeftNode.next = removeNode
  }
  // S4 返回结果
  return dummyHead.next
}
```


```ts
// 实现方法2:  虚拟头节点 + 局部反转更新法
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  //S1 创建虚拟头节点
  let dummyHead = new ListNode(0)
  dummyHead.next = head
  let beforeLeft = dummyHead

  //S2 找到不需要反转的临界节点beforeLeft
  for (let i = 0; i < left-1; i++) {
    beforeLeft = beforeLeft.next  
  }

  //S3 对且只对 [left, right]部分进行 整体反转
  let pre = null
  let next = null
  let cur = beforeLeft.next
  for (let i = left; i <= right; i++) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  //S4 临界点拼接 反转过后的[left, right]部分
  beforeLeft.next.next = next
  beforeLeft.next = pre

  //S5 返回结果
  return dummyHead.next
}
```


```ts
// 实现方法3: 递归实现法
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  let successor = null

  //S1 定义[left, right]的终止条件 ==> left === 1，相当于反转前N个节点
  if (left === 1) {
    return reverseN(head, right)
  }
  let between = reverseBetween(head.next, left-1, right-1)
  head.next = between
  return head

  //定义递归函数： 反转[1, right]个节点
  function reverseN (head, n) {
    // 定义终止条件：只反转头节点
    if ( n === 1) {
      successor = head.next  // 指向了 第N+1个节点
      return head
    } 
    let nextNode = head.next
    //S1.2 head越来越深，n越来越浅 ==> 栈
    const last = reverseN(nextNode, n-1)
    //S1.3 让下一个节点，指向当前节点 + 让当前节点，指向N+1个节点
    nextNode.next = head
    head.next = successor
    return last
  }
}
```