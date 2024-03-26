let m = 0, n = 0
let visited = [[]]
let pos = [[-1, 0], [0,1], [1, 0], [0, -1]]

function numIslands(grid) {
  if (!grid || !grid.length || !grid[0].length) return 0;
  // 变量定义
  let res = 0
  m = grid.length, n = grid[0].length
  visited = Array.from({length: m}).map(() => Array(n).fill(false))
  // 循环 + dfs
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 只有遇到没访问过+是岛屿的节点，才会去尝试 寻找其上下左右相邻的节点
      if (!visited[i][j] && grid[x][y] === '1') {
        dfs(grid, i, j)
        res++
      }
    }
  }
  return res 
};

function dfs(grid, x, y) {
  // 递归中止条件：该节点被访问过 || 该节点超出边界 || 该节点不是岛屿
  if (visited[x][y] || !inArea(x, y) || grid[x][y] !== "1") return;
  // 本轮行为: 标记岛屿被访问 && 寻找其可以连接成边的 节点
  visited[x][y] = true;
  for (let nextPos = 0; nextPos < 4; nextPos++) {
    let newX = x + pos[nextPos][0];
    let newY = y + pos[nextPos][1];
    dfs(grid, newX, newY)
  }
}

function inArea(x, y) {
  return x >= 0 && x <= m && y >= 0 && y <=n
}















// leetcode  79-36-n

/**
 * 
这是一个典型的图搜索问题。

在这个问题中，我们可以把整个二维网格看成一个图，每个单元格是图的一个节点。
如果两个陆地单元格（值为'1'）上下或者左右相邻，我们就认为它们之间有一条边。

问题中，岛屿被定义为由相邻陆地单元格组成的区域，这可以看作图中的一个连通分量（Connected Component），即一个子图，
这个子图中的任意两个节点都存在一条路径相连。

所以，这个问题可以被抽象为：在给定图中寻找连通分量(子图)的数量。

为了解决这个问题，我们可以使用图的遍历算法，例如深度优先搜索（DFS）或者广度优先搜索（BFS）。
具体做法是：遍历二维网格的每一个单元格，当遇到值为'1'的单元格，且其未被访问过时，我们就从这个单元格出发，
对未访问过的相邻陆地单元格进行搜索，完成一次搜索就可以发现一个岛屿（一个连通分量）。

然后，继续检查剩余单元格，直到所有单元格都被检查完毕，这样我们就找到了所有的岛屿。
此外，我们也需要一个和网格同样大小的二维数组（或者修改原有的网格）来记录每个单元格是否被访问过，以防将同一个岛屿计数多次。
 */





