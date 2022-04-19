# LeetCode283- 移动零

## 图示
![lt283_1](https://s1.ax1x.com/2022/04/19/LBJVaR.md.png)

![lt283_2](https://s1.ax1x.com/2022/04/19/LBJKxO.png)

![lt283_3](https://s1.ax1x.com/2022/04/19/LBJBLQ.png)


## 代码实现

```ts
function moveZeroes(nums: number[]): void {
  //遍历nums，从而使得 [0, k)为非0元素，[k, i]为0元素
  let k = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      // 优化方法，避免  都是非0元素的数组还要交换自己的
      if (k !== i) {
        [nums[k], nums[i]] = [nums[i], nums[k]]
        k++
      } else {
        k++
      }
    }
  }
}
```
