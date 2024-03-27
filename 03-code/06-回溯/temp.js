let m = 0, n = 0
let visited = [[]]
let pos = [[-1, 0], [0,1], [1, 0], [0, -1]]

function numIslands(grid) {
  if (!grid || !grid.length || !grid[0].length) return 0;
  m = grid.length, n = grid[0].length
  visited = Array.from({length: m}).map(() => Array(n).fill(false))
  let res = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] === '1') {
        bfs(grid, i, j)
        res++
      }
    }
  }
  return res
};

function bfs(grid, x, y) {
  visited[x][y] = true;
  let queue = [{ x, y }];
  while (queue.length) {
    const curNode = queue.shift();
    for (let nextPos = 0; nextPos < 4; nextPos++) {
      const newX = curNode.x + pos[nextPos][0];
      const newY = curNode.y + pos[nextPos][1];
      if (
        inArea(newX, newY) &&
        !visited[newX][newY] &&
        grid[newX][newY] === "1"
      ) {
        visited[newX][newY] = true
        queue.push({ x: newX, y: newY });
      }
    }
  }
}

function inArea(x, y) {
  return x >= 0 && x <= m && y >= 0 && y <=n
}







