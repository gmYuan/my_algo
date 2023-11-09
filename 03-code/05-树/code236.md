# LeetCode236- 二叉树的最近公共祖先

1 思维关键词:
  - 方法1: dfs + 回溯
  

2 参考文档

[01 直接参考文档](https://github.com/liuyubobobo/Play-Leetcode/tree/master/0001-0500/0236-Lowest-Common-Ancestor-of-a-Binary-Tree/cpp-0236)


## 代码实现

1 方法1: dfs + 回溯  时间复杂度: O(3n)  空间复杂度:  O(2n)

```ts
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let path1 = [], path2 = [],res = null
  dfs(root, p, path1)
  dfs(root, q, path2)
  // 获取到目标节点路径后，由于是二叉树，所以可以按序查找父节点
  for (let i = 0; i < path1.length && i < path2.length; i++) {
    // 易错点，由于是查找最近公共祖先，所以需要一直遍历到结束，以保存最新结果
    if (path1[i] === path2[i]) res = path1[i];
    // 剪枝操作：如果前序节点有不相等的，那么肯定不是相同路径直接结束即可
    else break;
  }
  return res
};

// 通过深度递归 + 回溯，获取到目标节点的查找路径
function dfs(node, target, path) {
  if (!node) return false
  path.push(node)
  // 表示查找到了目标节点，可以返回不用继续向下递归了
  if (node === target) return true
  // 如果递归结果为真，说明目标节点在左/右子树下，一路向上返回即可
  if (dfs(node.left, target, path)) return true;
  if (dfs(node.right, target, path)) return true;
  // 到这里说明左右子树返回结果为假，从保存路径里 剔除当前节点(回溯) + 继续向上返回false即可
  path.pop()
  return false
}
```

