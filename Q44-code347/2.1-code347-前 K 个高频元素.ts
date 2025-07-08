/*
题目大意：

给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。
你可以按 任意顺序 返回答案。

 
示例 1:
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]

示例 2:
输入: nums = [1], k = 1
输出: [1]
 

提示：
1 <= nums.length <= 105
k 的取值范围是 [1, 数组中不相同的元素的个数]
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。



思考路径：

1 统计每个元素出现的次数: Map
2 创建频率桶:
  - 索引为频率，值是该频率的 元素数组
  - 长度为 n + 1, 因为频率最大为 n && idx 从 0 开始

3 从后向前遍历频率桶，直到收集到 前k个高频元素时，返回结果数组
  - 使用 res.length < k 作为条件，确保只收集前k个高频元素

*/

export {};

function topKFrequent(nums: number[], k: number): number[] {
  // S1 统计每个元素出现的次数
  const record = new Map<number, number>();
  for (const num of nums) {
    record.set(num, (record.get(num) || 0) + 1);
  }
  // S2 创建频率桶，其中最大频率可以节省空间，它可能小于 nums.length
  const maxFreq = Math.max(...record.values());
  const bucket = Array.from({ length: maxFreq + 1 }, () => []);

  // S3 将元素添加到频率桶中
  for (const [num, freq] of record.entries()) {
    bucket[freq].push(num);
  }

  // S4 从后向前遍历频率桶，收集前k个高频元素
  // 易错点：是前k个高频元素，而不是 频率是排名前k的 所有元素
  const res = [];
  for (let i = maxFreq; i >= 0 && res.length < k; i--) {
    res.push(...bucket[i]);
  }
  return res;
}
