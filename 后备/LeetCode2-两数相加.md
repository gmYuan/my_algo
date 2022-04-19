
# 题目描述

给出两个 `非空` 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 `逆序` 的方式存储的，并且它们的每个节点只能存储 `一位` 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

```
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

## 思维技巧

1 链表: `dummyNode` 虚拟表头 + `tail指针` 纪录当前移动位 + `while循环` 移动链表项;

2 数字相加: `sum` 单次相加结果 + `carry`  处理进位情况 + `% /` 计算值;


## 参考文档

[01 花花酱 LeetCode 2. Add Two Numbers](https://www.bilibili.com/video/BV1EJ411h72z)

[02 玩转数据结构](https://coding.imooc.com/class/chapter/207.html#Anchor)


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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let dummy = tail = new ListNode(0)  // 虚拟链表头 和 当前项指针tail
  let carry = sum = 0  // 进位变量carry 和 当前项的实际值 sum

  while (l1 || l2 || carry) {  // 只要存在 进位/链表项
    //S1 获得实际值
    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry

    //S2 创建当前指针项的 下一项 + 移动当前指针到 下一项
    tail.next = new ListNode( sum % 10)  // 8(18) % 10 = 8
    tail = tail.next

    //S3 记录是否有 进位项
    carry = parseInt(sum / 10)  // parseInt确保JS计算 非浮点数

    //S4 移动相加的 2个链表项到 下一项
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }

  // S5 返回实际的 处理结果链表 位置
  return dummy.next

};
```