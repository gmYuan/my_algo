/*


*/

export {};

function kthSmallest(matrix: number[][], k: number): number {
  const n = matrix.length;
  // 转换题意： 第k小的数 等价于 所有 <=某个数x 的数量cnt，cnt >= k个条件下的 最小值
  // 即 Min(v1, v2, v3 ...), 其中 vn 都满足 Cnt(<=vn值的数量) >= k
  // 其实 画个值域图 就能直观理解了
  let [l, r] = [matrix[0][0] - 1, matrix.at(-1).at(-1)];

  // 开区间二分查找：
  // 这种写法保证了 区间内只剩两个数时就退出循环，即 取 [min-1, r]
  // 不会出现 left 和 right 相等，造成 mid死循环的情况
  while (l + 1 < r) {
    const mid = l + ((r - l) >> 1);
    //即 Cnt(<=mid值的 数量) >= k，说明此时 该值过大了，右边界需要缩短
    if (check(mid)) {
      r = mid;
    } else {
      // 说明此时 该值过小了，左边界需要扩大
      l = mid;
    }
  }
  return r;

  // Util: 检查<=目标值的 元素个数是否达到k个
  function check(target: number): boolean {
    let [row, col, cnt] = [0, n - 1, 0];
    // 每次都从 右上角开始遍历
    while (row < n && col >= 0 && cnt < k) {
      // 当前列的值太大，左移一列
      if (matrix[row][col] > target) {
        col--;
      } else {
        // 当前行从 [0,col]都小于等于target
        cnt += col + 1;
        row++;
      }
    }
    return cnt >= k;
  }
}
