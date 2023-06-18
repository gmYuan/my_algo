# LeetCode94- 二叉树的中序遍历

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/yan-se-biao-ji-fa-yi-chong-tong-yong-qie-jian-ming/)

[02 方法2/3参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/dong-hua-yan-shi-94-er-cha-shu-de-zhong-xu-bian-li/)

[03 方法4参考](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/)

## 代码实现

方法1.1: 迭代-action模拟递归法  时间复杂度 O(n)  空间复杂度：O(n)

```ts
type actionType = {type: 'go' | 'print', node: TreeNode | null}

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []

  let stack: actionType[] = []
  let res = []
  const action = (type: actionType['type'], node: actionType['node']) => {
    return {type, node}
  }
  // 入口执行
  stack.push(action('go', root))

  // 中序遍历执行
  while (stack.length) {
    let cur = stack.pop()
    if (!cur.node) continue;
    if (cur.type === 'go') {
      stack.push(action('go', cur.node.right))
      stack.push(action('print', cur.node))
      stack.push(action('go', cur.node.left))
    } else {
      res.push(cur.node.val)
    }

  }
  return res
};
```

方法1.2: 方法1的代码简化版本，思路是一样的
```ts
function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let visited = []
  let stack = [root]

  while (stack.length) {
    let cur = stack.pop()
    if (!cur) continue;
    if (!visited.includes(cur)) {
      stack.push(cur.right, cur, cur.left)
      visited.push(cur)
    } else {
      res.push(cur.val)
    }
  }
  return res
};
```

方法2: 递归实现  时间复杂度 O(n)  空间复杂度：O(n)

```ts
function inorderTraversal(root: TreeNode | null): number[] {
  let res = []
  inorder(root, res)
  return res
};

function inorder(node: TreeNode | null, res: number[]) {
  if (!node) return
  inorder(node.left, res)
  res.push(node.val)
  inorder(node.right, res)
}
```

方法3: 迭代实现- 经典实现方式   时间复杂度 O(n)  空间复杂度：O(n)
```ts
function inorderTraversal(root: TreeNode | null): number[] {
  let res = [], stack:TreeNode[] = []
  while (root || stack.length) {
    if(root) {
      stack.push(root);
			root = root.left;
		} else {
      let cur = stack.pop();
			res.push(cur.val);
			root = cur.right;
		}
  }
  return res
};
```


方法4: 迭代实现- Morris遍历  时间复杂度 O(n)  空间复杂度：O(1)
```ts
// Morris遍历的实现原理
// 一个二叉树节点，在通过DFS时，都会被访问3次：左递开始--> 左归(右递开始) --> 右归
// Morris遍历本质: 在每个节点的左递阶段，通过pre.right->cur，来让树结构 链表顺序化

function inorderTraversal(root: TreeNode | null): number[] {
  let res = []
  let pre = null, cur = root
  while (cur) {
    if (!cur.left) {
      res.push(cur.val)
      cur = cur.right
    } else {
      // 找到前驱节点
      pre = cur.left
      while (pre.right && pre.right !== cur) {
        pre = pre.right
      }
      // 其前驱节点不存在右子节点时，说明处于左递阶段
      if (!pre.right) {
        pre.right = cur
        cur = cur.left
      // 其前驱节点存在右子节点时，说明处于左归(右递开始)阶段
      } else {
        pre.right = null
        res.push(cur.val)
        cur = cur.right
      }
    }
  }
  return res
};
```