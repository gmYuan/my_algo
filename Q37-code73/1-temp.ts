function setZeroes(matrix: number[][]): void {
  const [m, n] = [matrix.length, matrix[0].length];
  // S1 标记第一行 && 第一列 是否有0标识
  const [r0, c0] = [matrix[0].includes(0), matrix.some((row) => row[0] === 0)];
  // S2 从第1行第1列开始，遍历元素，遇到0则在对应的 首行 && 首列上 写入0标记
  matrix.slice(1).map((row, i) => {
    row.slice(1).map((val, j) => {
      // matrix[i][0] = 0：在第一列标记第i行需要置零
      // matrix[0][j] = 0：在第一行标记第j列需要置零
      if (val === 0) matrix[i][0] = matrix[0][j] = 0;
    });
  });
  // S3 从第1行第1列开始，只要元素对应的 首行 && 首列上 是0标记，则整行整列都写入0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 如果该元素所属的 第一行 || 第一列 有0标记，则将当前元素置0
      // matrix[i][0] === 0：检查第一列的标记
      // matrix[0][j] === 0：检查第一行的标记
      if (!matrix[i][0] || !matrix[0][j]) matrix[i][j] = 0;
    }
  }
  // S4 根据一开始获得的 第一行 && 第一列 0标识，处理第一行 && 第一列 的0值写入
  if (r0) matrix[0].fill(0);
  if (c0) matrix.map((row) => (row[0] = 0));
}
