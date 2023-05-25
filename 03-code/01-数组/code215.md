# LeetCode215- 数组中的第K个最大元素

## 实现思路

题目关键词: 数组；第K个最大元素

思维关键词: quickSort + partition + randomIndex + 首尾指针 && <=和>=分组


方法1: 随机比较点快速排序--> 双路快排--> 三路快排

方法2: 


参考实现:  <br/>
[01 ]()



## 代码实现

方法1.1: 随机比较点快排  平均时间复杂度:O(nlogn); 空间复杂度: O(logn)

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
  // 加入随机选中比较点逻辑，以避免有序情况下的子区间右倾
  let randomIndex = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l , randomIndex)
  // 基础版逻辑
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

基础快排存在的问题：
  - 缺点1: 在数据基本有序的情况下，会导致拆分子区间时右区间严重倾斜，导致退化成O(n^2)
  - 缺点2: 在有大量重复相等元素的情况下，也会导致区间严重右倾，导致退化成O(n^2)

缺点1的解决方法：每次选择基础比较点时，随机选择数据中的一个，而非固定最左侧的那个

对于缺点2的解决方法，见下文 方法1.2实现

---------------------------------------------------------------
方法1.2: 双路快排  平均时间复杂度:O(nlogn); 空间复杂度: O(logn)

```ts
function findKthLargest(nums: number[], k: number): number {
  const size = nums.length - 1
  quickSort(nums, 0, size)
  return nums[size - k + 1]
};

function quickSort(arr: number[], left: number, right: number) {
  if (left >= right) return
  let p = partition(arr, left, right)
  quickSort(arr, left, p-1)
  quickSort(arr, p+1, right)
}

function partition(arr: number[], left: number, right: number): number {
  // 保持[left+1, less)都<= val, (more, right]都>= val
  swap(arr, left, Math.floor(Math.random() * (right-left+1) + left))
  const val = arr[left]
  let less = left + 1
  let more = right
  // 注意点1: 等于是需要的，因为less的初始值时left+1，而非left
  while(less <= more) {
		// 注意点2: less<=right的条件非必需，但是是一个优化手段
    while (less <= right && arr[less] < val) less++
    while ( more >= left + 1 && arr[more]> val) more--
    // 注意点3: 这一步是必须的，也是易错点
    // 因为当less>more时，说明[left, less-1]都<=val, [more+1, right]都>=val
    // 则此时已经归类完arr所有成员，再交换less和more的位置反而会破坏分组的正确性，
    // 导致更新后的less和more值不是正确的结果位置
    if ( less > more) break
		swap(arr, less++, more--)
  }
  // 注意4: 这一步使用less-1也是可以的
  swap(arr, left, right)
  return right
}

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```

---------------------------------------------------------------
方法1.3: 三路快排  平均时间复杂度:O(nlogn); 空间复杂度: O(logn)

```ts
function findKthLargest(nums: number[], k: number): number {
  const size = nums.length - 1
  quickSort(nums, 0, size)
  return nums[size - k + 1]
}

function quickSort(arr: number[], left: number, right: number) {
  if (left >= right) return
  let [less, more] = partition(arr, left, right)
  quickSort(arr, left, less-1)
  quickSort(arr, more, right)
}

function partition(arr: number[], left: number, right: number): number[] {
  swap(arr, left, Math.floor(Math.random() * (right-left+1) + left))
  const val = arr[left]
  // 保持[left+1, less]都<val, [less+1, i)都=val, [more, right]都>val
  let less = left, more = right + 1, i = left + 1
  while (i < more) {
		if (arr[i] < val) {
      swap(arr, ++less, i++)
    } else if (arr[i] === val) {
      i++
    } else {
      swap(arr, --more, i)
    }
  }
  swap(arr, left, less)
  return [less, more]
}

function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```