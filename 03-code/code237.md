# LeetCode237- 删除链表中的节点

## 图示参考

[01 方法参考](https://leetcode.cn/problems/delete-node-in-a-linked-list/solution/73-shan-chu-lie-biao-zhong-de-jie-dian-by-joeyzhou/)

## 代码实现

方法1: 复制伪造  时间复杂度 O(1)  空间复杂度：O(1)

```ts
function deleteNode(root: ListNode | null): void {
  // 写法1: 
  // root.val = root.next.val
  // root.next = root.next.next

  // 写法2: ES6的快捷语法
  Object.assign(root, root.next)
};
```