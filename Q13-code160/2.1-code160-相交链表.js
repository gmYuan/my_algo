/**

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点
如果两个链表不存在相交节点，返回 null 。
 
题目数据 保证 整个链式结构中不存在环
注意，函数返回结果后，链表必须 保持其原始结构


示例 1：
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'

解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
  — 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。
  换句话说，它们在内存中指向两个不同的位置，
  而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。


示例 2：
输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'

解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。


示例 3：
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：No intersection

解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。

提示：
listA 中节点数目为 m
listB 中节点数目为 n
1 <= m, n <= 3 * 104
1 <= Node.val <= 105
0 <= skipA <= m
0 <= skipB <= n
如果 listA 和 listB 没有交点，intersectVal 为 0
如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]
 
进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？
*/

/*
思维层面

1 考虑到A和B的链表长度可能不同，所以如果依次移动pa和pb，那么就永远无法【同时】指向相交对象

2 假设A的链表长度m = a + c; B的链表长度 n= b + c
  - 其中 c是 A和B的相交节点的长度
  - 当 a !== b时，一开始依次移动 pa和pb，肯定无法指向 同一个相交对象t
  - 这时候可以在pa遍历完A链表后，继续从B链表的头节点开始，依次向下移动
  - 同理，pb遍历完B链表后，继续从A链表的头节点开始，依次向下移动
  - 就这样每次都依次移动pa和pb，那么在pa移动 a+c+b次后，此时pb必然移动的是 b+c+a次
  - 此时 pa的值必然等于pb，此时也是相加链表的头节点，从而命中了pa === pb

*/

// 实现
function getIntersectionNode(headA, headB) {
  let seen = new Set();
  for (let pa = headA; pa; pa = pa.next) {
    if (pa) seen.add(pa);
  }
  for (let pb = headB; pb; pb = pb.next) {
    if (seen.has(pb)) return pb;
  }
  return null;
}
