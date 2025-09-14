/*

给你一个满足下述两条属性的 m x n 整数矩阵：
  - 每行中的整数从左到右按 非严格递增顺序排列。
  - 每行的第一个整数大于前一行的最后一个整数。

给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。


示例 1：
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true


示例 2：
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
 

提示：
  - m == matrix.length
  - n == matrix[i].length
  - 1 <= m, n <= 100
  - -104 <= matrix[i][j], target <= 104

*/

export {};

/**


*/

function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  // 从右上角开始搜索，先确定行，再收缩列
  let row = 0, col = n - 1;
  while (row < m && col >= 0) {
    const x = matrix[row][col];
    if (x === target)  return true;
    // 当前行的最大值 小于目标值，（排除此行）向下移动行
    if (x < target) {
      row++; 
    } else {
      // 当前行的最大值 大于目标值，（排除此列）向左移动列
      col--; 
    }
  }
  return false;
}
