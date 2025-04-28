/**
code54- 螺旋矩阵

给你一个 m 行 n 列的矩阵 matrix ，
请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素

示例1
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3, 6,9, 8,7, 4,5]

*/



// function spiralOrder(matrix) {
//   // 矩阵：m行 * n列
//   const m = matrix.length, n = matrix[0].length;
//   // 移动方向顺序：右--> 下--> 左--> 上
//   const DIRS = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];
//   // i：当前所在行数; j: 当前所在列数； dirIdx: 当前移动方向索引，和 DIRS 相对应
//   let i = 0, j = 0, dirIdx = 0;
//   // 结果列表
//   let ans = [];

//   // 从0开始，走的总步数一定是 [0, m*n)
//   for (let k = 0; k < m * n; k++) {
//     // 保存当前访问元素，并标记 该元素已访问过
//     ans.push(matrix[i][j]);
//     matrix[i][j] = Infinity;
//     // 嗅探 下一个元素是否到达 左右上下的边界/ 是否已访问过，是的话则 向右转向90度
//     let nextI = i + DIRS[dirIdx][0], nextJ = j + DIRS[dirIdx][1];
//     if (
//       nextI < 0 || nextI >= m ||
//       nextJ < 0 || nextJ >= n ||
//       matrix[nextI][nextJ] === Infinity
//     ) {
//       // 是的话则 向右转向90度
//       dirIdx = (dirIdx + 1) % 4
//     }
//     // 让i和j指向 正确的 新方向的 起始位置
//     i = i + DIRS[dirIdx][0]
//     j = j + DIRS[dirIdx][1]
//   }
//   return ans
// }



