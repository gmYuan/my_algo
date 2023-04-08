# LeetCode103- 二叉树的锯齿形层序遍历

## 图示参考

[01 方法参考](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/solution/bfshe-dfsliang-chong-jie-jue-fang-shi-by-184y/)


## 代码实现

方法1: BFS + 双端队列法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res = []
  let queue = [root]
  let isEven = true
  while (queue.length) {
    let temp = []
    let n = queue.length
    for (let i = 0; i < n; i++) {
      let cur = queue.shift()
      isEven ? temp.push(cur.val) : temp.unshift(cur.val)
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    res.push(temp)
    isEven = !isEven
  }
  return res
}
```

方法2: 递归法:  时间复杂度 O(n)  空间复杂度：O(h)

```ts
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return []
  let res =[]
  innerOrder(0, root, res)
  return res
}

function innerOrder(level: number, node: TreeNode, res: number[][]) {
  if (res.length < level + 1) {
    res.push([])
  }
  let temp = res[level]
  // 奇数头加， 偶数尾加
  level & 1 ? temp.unshift(node.val) : temp.push(node.val)
  res[level] = temp
  // 处理子节点
  if (node.left) {
    innerOrder(level+1, node.left, res)
  }
  if (node.right) {
    innerOrder(level+1, node.right, res)
  }
}
```