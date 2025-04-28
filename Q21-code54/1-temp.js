// 解法2
/**



*/

function spiralOrder(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const size = m * n;
  const DIRS = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];
  const ans = [];
  // 从 (0, -1) 开始
  let i = 0, j = -1;
  // 根据4个方向进行轮次循环，直到所有数字都被读取了
  for (let dirIdx = 0; ans.length < size; dirIdx = (dirIdx + 1) % 4) {
    // 每个方向内，每次读取该方向上的一个数字
    for (let step = 0; step < n; step++) {
      i += DIRS[dirIdx][0];
      j += DIRS[dirIdx][1];
      ans.push(matrix[i][j]);
    }
    // 一个方向读取完成后，下一个方向会根据 上一个方向的垂直方向值缩短
    // 即：[列1， 行1]--> [行1-1, 列1]--> [列1-1, 行1-1]--> [行1-2, 列1-1]...
    // 本质其实就是 交替减小 m和n 的值
    [n, m] = [m - 1, n];
  }
  return ans;
}
