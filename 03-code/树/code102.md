# LeetCode102- 二叉树的层序遍历

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/)

[02 方法2参考](https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/die-dai-di-gui-duo-tu-yan-shi-102er-cha-shu-de-cen/)


## 代码实现

方法1: BFS + 队列法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = [] 
  let queue = [root]
  while (queue.length) {
    const n = queue.length
    let temp = []
    // 每轮的while循环，都弹出和记录 处于同一层的所有节点
    for (let i = 0; i < n; i++) {
      let cur = queue.shift()
      temp.push(cur.val) 
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    res.push(temp)
  }
  return res
};
```

方法2: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = []
  innerOrder(1, root, res)
  return res
};

function innerOrder(curLevel: number, node: TreeNode, res: number[][]) {
  if (res.length < curLevel) {
    res.push([])
  }
  res[curLevel-1].push(node.val)

  if (node.left) {
    innerOrder(curLevel+1, node.left, res)
  }
  if (node.right) {
    innerOrder(curLevel+1, node.right, res)
  }
}
```