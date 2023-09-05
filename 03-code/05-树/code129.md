# LeetCode129- 求根节点到叶节点数字之和

1 思维关键词: 
  - 方法1: DFS + 高低位求和性质
  
  
2 参考文档

[01 方法1参考实现](https://leetcode.cn/problems/sum-root-to-leaf-numbers/solutions/464666/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/)


## 代码实现

1 方法1: DFS + 高低位求和性质   时间复杂度: O(n);  空间复杂度: O(n)

```ts
function sumNumbers(root: TreeNode | null): number {
  return dfs(root, 0);
};

function dfs(node, pre) {
  if (!node) return 0
  // 求和性质：低位求和 = 高位求和值 * 10 + 当前位值
  const sum = pre * 10 + node.val
  if (!node.left && !node.right) {
    return sum
  } else {
    // 非叶子节点，则把当前位的和传入下一层，继续求和即可
    return dfs(node.left, sum) + dfs(node.right, sum)
  }
}
```

