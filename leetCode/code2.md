
# LeetCode2- 两数相加

## 图示

[01 方法1参考](https://leetcode.cn/problems/add-two-numbers/solution/hua-jie-suan-fa-2-liang-shu-xiang-jia-by-guanpengc/)

[02 方法2参考](https://leetcode.cn/problems/add-two-numbers/solution/di-gui-si-lu-jian-dan-dai-ma-duan-by-dnanki/)

## 代码实现

```ts
// 方法1: 迭代

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
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let dummyNode = new ListNode(0)
  let curNode = dummyNode
  let sum = 0
  let carry = 0
  // 易错点： 考虑存在进位的情况
  while (l1 || l2 || carry) {
    sum = (l1 ? l1.val: 0) + (l2 ? l2.val : 0) + carry
    curNode.next = new ListNode(sum % 10)
    // 易错点：JS语法特性，需要用地板除取整
    carry = Math.floor(sum / 10)
    // 移动指针
    l1 = l1?.next 
    l2 = l2?.next
    curNode = curNode.next
  }
  return dummyNode.next
};
```


```ts
// 方法2: 递归实现
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 递归含义：计算了和并返回了当前节点
  const innerAdd = (node1: ListNode, node2: ListNode, carry: number) => {
    if (!node1 && !node2 && !carry) return null
    let sum = (node1?.val || 0) + (node2?.val || 0) + carry
    carry =  Math.floor(sum / 10)
    let curNode =  new ListNode(sum % 10)
    curNode.next = innerAdd(node1?.next, node2?.next, carry)
    return curNode
  }
  return innerAdd(l1, l2, 0)
};
```