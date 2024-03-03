// code  47-39-y

// ltcode地址
// https://leetcode.cn/problems/permutations-ii/description/


function permuteUnique(nums: number[]): number[][] {
  if (!nums.length) return []
  const res = [];
  const used = new Array(nums.length).fill(false);
  // 关键点1: 排序,用于后续排除 同深度层的重复元素
  nums.sort((a, b) => a - b); 
   // 执行回溯
  backtrack([]);
  // 返回结果
  return res; 

  // 处理[0/1/2/...n-1,n-1]位的nums，获取它的全排列
  function backtrack(path){
    if (path.length == nums.length) {
      // 易错点1: 引用类型值，在回溯时 需要进行浅拷贝
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 剪枝条件: 该位置元素被使用过，或者 当前值和前一个元素值相同并且前一个值没被使用过(说明是 处于同层深度的后一位重复元素)
      if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
        continue; 
      }
      // 做选择 + 标记已做选择
      // 关键点2: used[i]既能标识了已处理的的位数元素，还标识了当前重复值是非同一层还是 同一层
      path.push(nums[i]); 
      used[i] = true; 
      // 进入下一层决策树
      backtrack(path); 
      // 撤销选择 + 标记未做选择
      path.pop(); 
      used[i] = false;
    }
  };
}


const res = permuteUnique([1,1,2])
console.log('rr', res)