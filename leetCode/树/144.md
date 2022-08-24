# LeetCode144- 二叉树的前序遍历

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/leetcodesuan-fa-xiu-lian-dong-hua-yan-shi-xbian-2/)

[02 方法2参考](https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/cer-cha-shu-san-chong-bian-li-qian-zhong-erk2/)


## 代码实现

方法1: 迭代法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  if(!root) return []
  let res = []
  let stack = [root]
  while (stack.length) {
    let cur = stack.pop()
    res.push(cur.val)
    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return res
};
```

方法2: 递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  let res = []
  innerPre(res, root)
  return res
};

function innerPre(res: number[], node: TreeNode | null) {
  if (!node) return
  res.push(node.val)
  innerPre(res, node.left)
  innerPre(res, node.right)
}
```