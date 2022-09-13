# LeetCode145- 二叉树的后序遍历

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/)

[02 方法2参考](https://leetcode.cn/problems/binary-tree-postorder-traversal/solution/a-li-mian-shi-ti-zhi-yong-zhan-qu-zuo-er-cha-shu-d/)

[03 Morris方法图解 ](https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/leetcodesuan-fa-xiu-lian-dong-hua-yan-shi-xbian-2/)


## 代码实现

方法1: 迭代法: visited标记法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let visited = new Set()
  let res = []
  let stack = [root]
  while (stack.length) {
    let cur = stack.pop()
    if (!cur) continue
    if (!visited.has(cur)) {
      stack.push(cur, cur.right, cur.left)
      visited.add(cur)
    } else {
      res.push(cur.val)
    }
  }
  return res
};
```

方法2: 迭代法: null归2标记法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let stack = [root]
  while (stack.length) {
    let cur = stack[stack.length-1]
    if (cur === null){
      stack.pop()
      let node = stack.pop()
      res.push(node.val)
      continue
    }
    stack.push(null)
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

方法3: 递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  let res = []
  innerPost(res, root)
  return res
};

function innerPost(res: number[], node: TreeNode | null) {
  if (!node) return 
  innerPost(res, node.left)
  innerPost(res, node.right)
  res.push(node.val)
}
```