# LeetCode215- 215. 数组中的第K个最大元素

## 实现思路

关键词: 数组；第K个最大元素

方法1: 快速排序

方法2: 


参考实现:  <br/>
[01 ]()



## 代码实现

方法1.1: 基础快排法  平均时间复杂度:O(nlogn); 空间复杂度: O(logn)

```ts
function findKthLargest(nums: number[], k: number): number {
    const size = nums.length -1 
    quickSort(nums, 0, size)
    //S1 排好序的数组，第k大个成员 对应的下标是 length-k
    return nums[size - k + 1]
};

function quickSort(arr: number[], l: number, r: number) {
    if (l>=r) return
    //S1 单次处理内容: 对arr内任意1个成员A排序，返回其正确的下标位置
    // 即 [l, p-1]的成员都 < A, [p+1, r]的成员都 >= A,
    // 每经过1次处理，都会有1个成员被正确排序
    const p = partition(arr, l, r)
    //S2 以A所在的位置p为分割点，继续排序左右子区间内的 某1个成员位置
    // 直到左右子区间内所有元素都被排序，再加上自己已被正确排序了，这样就完成了整个区间的排序
    quickSort(arr, l, p-1)
    quickSort(arr, p+1, r)
}

function partition(arr: number[], l: number, r: number): number {
    const val = arr[l]
    let j = l
    // 始终满足[l+1, j]<val && [j+1, i) >=val
    for (let i = l + 1; i <= r; i++) {
        if (arr[i] < val) {
            // 先让j向后移动，从而让当前的j 指向是一个>=val的成员
            swap(arr, i, ++j)
        }
    }
    // 此时让arr[j]值（它是比val小的范围内的 最后的一个成员）放在开头
    // 让 arr[l]的目标值，放在 [l, j-1]< val && [j, r]>= val的位置
    swap(arr, l, j)
    return j
}

function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
```