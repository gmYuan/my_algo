# LeetCode200- 岛屿数量

1 思维关键词: 
  - 方法1: dfs-递归实现

2 参考文档

[01.1-方法1-参考实现](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0200-Number-of-Islands/java-0200/src/Solution.java)

[01.2-方法1-图示](https://leetcode.cn/problems/number-of-islands/solutions/211211/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/)





## 代码实现

1 方法1: dfs-递归实现  时间复杂度: O(m*n);  空间复杂度: O(m*n)

```ts
let m = 0, n = 0
let visited = [[]]
let pos = [[-1, 0], [0,1], [1, 0], [0, -1]]

function numIslands(grid: string[][]): number {
  if (!grid || !grid.length || !grid[0].length) return 0;
  // 变量定义
  let res = 0
  m = grid.length, n = grid[0].length
  visited = Array.from({length: m}).map(() => Array(n).fill(false))
  // 循环 + dfs
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 只有遇到没访问过+是岛屿的节点，才会去尝试 寻找其上下左右相邻的节点
      if (!visited[i][j] && grid[i][j] === '1') {
        dfs(grid, i, j)
        res++
      }
    }
  }
  return res 
};

function dfs(grid, x, y) {
  // 递归中止条件：该节点超出边界 || 该节点被访问过 || 该节点不是岛屿
  if (!inArea(x, y) || visited[x][y] || grid[x][y] !== "1") return;
  // 本轮行为: 标记岛屿被访问 && 寻找其可以连接成边的 节点
  visited[x][y] = true;
  for (let nextPos = 0; nextPos < 4; nextPos++) {
    let newX = x + pos[nextPos][0];
    let newY = y + pos[nextPos][1];
    dfs(grid, newX, newY)
  }
}

function inArea(x, y) {
  return x >= 0 && x < m && y >= 0 && y < n
}
```
