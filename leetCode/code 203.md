# LeetCode203- 移除链表元素

## 思维解析
解法1: 虚拟头节点
S1 虚拟头节点的创建:  新创建节点实例 + 手动赋值next指向
S2 删除节点: 必须要找到 preNode，从而通过更新preNode.next指向来去除 (如果是currentNode则无法去除该节点)

解法2: 递归实现
S1 递归基础：空链表时，直接返回null
S2 递归更新：

## 易错点:
S3 [1] + 1 ==> 返回结果不能是head：因为传入head必然有值，返回dummyHead.next才有返回值为 []


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
 * @param {number} val
 * @return {ListNode}
 */

 // 解法1: 虚拟头节点
var removeElements = function(head, val) {
  // S1
  let dummyHead = new ListNode(-1)
  dummyHead.next = head
  // S2
  let preNode = dummyHead
  while(preNode && preNode.next) {
    if (preNode.next.val === val) {
      preNode.next = preNode.next.next
    } else {
      preNode = preNode.next
    }
  }  
  // S3
  return dummyHead.next
}


// 解法2: 递归实现
var removeElements = function(head, val) {
  if (!head) return null;
  head.next = removeElements(head.next, val)
  return (head.val === val ? head.next : head)
}
```