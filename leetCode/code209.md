# LeetCode209- 长度最小的子数组

## 图示

[01 滑动窗口实现](https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/javade-jie-fa-ji-bai-liao-9985de-yong-hu-by-sdwwld/)


## 代码实现

```ts
function minSubArrayLen(target: number, nums: number[]): number {
    // 默认返回个数为 数组长度+1，这样可以确保是 不可能取值的最小值
    let res = nums.length + 1
    // 滑动窗口的范围[left, right)，初始为 [0, 0),即一开始无任何元素
    let left = 0, right = 0
    // 当前窗口之和
    let sum = 0

    while (right < nums.length) {
       // 扩大窗口范围的条件
        sum += nums[right]
        right++
       // 窗口缩窄的条件
        while (sum >= target) {
            res = Math.min(res, right - left)
            sum -= nums[left]
            left++
        }
    }
    // 当遍历结束不存在值时，根据要求返回0
    return res === nums.length +1 ? 0 : res
}
```