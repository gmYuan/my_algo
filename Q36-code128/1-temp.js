function longestConsecutive(nums: number[]): number {
  let numSet = new Set(nums);
  let res = 0;
  // S1 遍历所有可能的起点
  for (let x of numSet) {
    // S2 如果当前元素的 前一个数 存在，
    // 说明它必然不可能是 序列的起点，直接跳过
    if (numSet.has(x - 1)) continue;

    // S3 找到当前序列的终点，以获取一个可能的返回值
    let y = x + 1;
    while (numSet.has(y)) y++;

    // S4 更新res，获取其最大值
    // 循环结束后，y-1 是最后一个在Set里的数
    // 从 x 到 y-1 一共 y-x 个数
    res = Math.max(res, y - x);

    // S5 如果当前序列长度 已经是可能的最大值，就可以提前结束
    if (res === nums.length) break;
  }
  return res;
}
