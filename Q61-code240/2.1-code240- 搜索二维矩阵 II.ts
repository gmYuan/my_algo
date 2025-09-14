/*

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。
该矩阵具有以下特性：
  - 每行的元素从左到右升序排列。
  - 每列的元素从上到下升序排列。


示例 1：
输入：
  matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
  target = 5
输出：true


示例 2：
输入：
  matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
  target = 20
输出：false
 

提示：
  - m == matrix.length
  - n == matrix[i].length
  - 1 <= n, m <= 300
  - -109 <= matrix[i][j] <= 109
  - 每行的所有元素从左到右升序排列
  - 每列的所有元素从上到下升序排列
  - -109 <= target <= 109

*/

export {};

/**

target > v1+s
  - 同col: row-- && 每row的 col--
  - 同row: col--

  - 怎么把 v1+d部分 重新计入？
    - 同col: row++ && 每row的 col
    - 容row: col++


v1,  v1+, v1+d...

v1+, v1+s, ...

v1+d, v1+,  ...

*/

// 原始问题：返回是否存在目标值
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let row = 0, col = n - 1;
  while (row < m && col >= 0) {
    const x = matrix[row][col];
    if (x === target) return true;
    x < target ? row++ : col--;
  }
  return false;
}


// 变种问题：找到横纵坐标和最小的目标值位置
interface Position {
  row: number;
  col: number;
}

function findMinSumPosition(matrix: number[][], target: number): Position | null {
  const m = matrix.length, n = matrix[0].length;
  let row = 0, col = 0;
  let result: Position | null = null;
  
  // 从左上角开始，每次向右或向下移动
  while (row < m && col < n) {
    if (matrix[row][col] === target) {
      // 找到一个目标值，由于我们是从左上角开始，这就是和最小的位置
      return { row, col };
    }
    
    // 决定下一步移动方向
    // 如果右边的值小于等于目标值，优先向右移动
    if (col + 1 < n && matrix[row][col + 1] <= target) {
      col++;
    }
    // 否则如果下边的值小于等于目标值，向下移动
    else if (row + 1 < m && matrix[row + 1][col] <= target) {
      row++;
    }
    // 如果两个方向都大于目标值，说明当前路径不可能找到目标值
    else {
      break;
    }
  }
  
  return null;
}
