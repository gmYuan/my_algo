# LeetCode199- 二叉树的右视图

## 图示参考

[01 方法参考](https://leetcode.cn/problems/binary-tree-right-side-view/solution/jian-dan-bfsdfs-bi-xu-miao-dong-by-sweetiee/)


## 代码实现

方法1: BFS  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let temp = []
  let queue = [root]
  while (queue.length) {
    let n = queue.length
    for (let i = 0; i < n; i++) {
      let cur = queue.shift()
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
      if (i === n-1) {
        res.push(cur.val)
      }
    }
  }
  return res
};
```

方法2: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  inner(0, root, res)
  return res
}

function inner(level: number, node: TreeNode, res: number[]) {
  if (res.length <= level) {
    res[level] = undefined
  }
  res[level] = node.val
  
  if (node.left) {
    inner(level+1, node.left, res)
  }
  if (node.right) {
    inner(level+1, node.right, res)
  }
}
```