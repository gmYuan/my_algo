/**
 * 
给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。
请使用 原地 算法。(想出一个仅使用常量空间的解决方案)

示例 1：
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]


示例 2：
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

*/

export {};

/*
思考路径
1 方法2: todo

核心思路：
  - 1. 使用两个独立的布尔数组分别记录需要置零的行和列
  - 2. 第一次遍历：标记所有包含0的行和列
  - 3. 第二次遍历：根据标记进行批量置零

*/

function setZeroes(matrix: number[][]): void {
  // S1: 创建两个布尔数组，分别记录需要置零的行和列
  const [m, n] = [matrix.length, matrix[0].length];
  const [rows, cols] = [Array(m).fill(false), Array(n).fill(false)];

  // S2: 遍历矩阵，发现0就标记对应的行和列
  matrix.map((row, i) =>
    row.map((val, j) => {
      if (val === 0) [rows[i], cols[j]] = [true, true];
    })
  );

  // S3 批量置零：优先处理整行，再处理列
  // 根据行标记，整行fill(0)置零
  // 根据列标记，整列逐行置零
  rows.map((needZero, i) => {
    if (needZero) matrix[i].fill(0);
  });
  cols.map((needZero, j) => {
    if (needZero) matrix.map((row) => (row[j] = 0));
  });
};
