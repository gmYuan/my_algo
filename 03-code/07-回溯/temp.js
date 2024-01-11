let used = []

function permute(nums: number[]): number[][] {
  if (!nums || !nums.length) return []
  const res = [], depthRes = []
  used = new Array(nums.length)
  dfs(nums, 0, depthRes, res)
  return res
};

function dfs(nums, depthIdx, depthRes, res) {
  if (depthIdx === nums.length) {
    res.push([...depthRes])
    return
  }
  for (let i = 0; i < nums.length; i++) {
    if (!used[i]) {
      used[i] = true
      depthRes.push(nums[i])
      dfs(nums, depthIdx+1, depthRes, res)
      used[i] = false
      depthRes.pop()
    }
  }
}


nums = [1,2,3]
const result = permute(nums)
console.log('result', result)





