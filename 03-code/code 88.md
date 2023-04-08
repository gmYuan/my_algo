# LeetCode88- 合并两个有序数组

## 思维解析

1 合并数组 ==>  合并 + 排序 => 复杂度为 O(logN)
2 有序数组 ==> 三指针法 ==> 复杂度为 O(N)
3 数组1的长度为 m + n ==> 三指针 + 从后向前比较 ==> 空间复杂度为 O(1)

## 代码实现

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 解法1： 暴力合并 + 排序
var merge = function(nums1, m, nums2, n) {
  nums1.splice(m,n,...nums2)
  // 易错点，直接调用sort默认是按字符串的字典序排序的，所以要自定义排序
  nums1.sort((a, b) => a - b)
}

// 解法2.1: 三指针 从前向后
function merge(nums1, m, nums2, n) {
  let p1 = 0
  let p2 = 0
  let resP = 0
  let res = []
  while (p1 < m || p2 < n) {
    // 易错点：临界情况是 指针等于m时，表示nums1全都遍历过了
    if (p1 === m) {
      res[resP] = nums2[p2]
      p2++
    } else if (p2 === n) {
      res[resP] = nums1[p1]
      p1++
    } else if (nums1[p1] < nums2[p2]) {
      res[resP] = nums1[p1]
      p1++
    } else {
      res[resP] = nums[p2]
      p2++
    }
    resP++
  }
  nums1.splice(0, m+n, ...res)
}

// 解法2.2: 三指针代码简化版
function merge(nums1, m, nums2, n) {
  let p1 = 0; let p2 = 0; let resP = 0
  // 易错点，如果不使用copy而是直接使用num1，则num1因为 过程中会被修改而导致结果错误
  let nums1Copy = [...nums1]
  while ( resP < m + n) {
    if (p1 < m && p2 < n) {
      nums1[resP++] = nums1Copy[p1] < nums2[p2] ? nums1Copy[p1++] : nums2[p2++]
    } else {
      nums1[resP++] = p1 === m ? nums2[p2++] : nums1Copy[p1++]
    }
  }
}

// 解法3.1:  三指针 + 从后向前
function merge(nums1, m, num2, n) {
  let tailP1 = m - 1; let tailP2 = n - 1; let tailRes = m + n - 1
  while (tailRes > -1) {
    if (tailP1 > -1 && tailP2 > -1) {
      // 易错点： 从后向前放的时候，应该先放大的，再放小的
      nums1[tailRes--] = nums1[tailP1] > nums2[tailP2] ? nums1[tailP1--] : nums2[tailP2--]
    } else {
      nums1[tailRes--] = tailP1 > -1 ? nums1[tailP1--] : nums2[tailP2--]
    }
  }
}

// 解法3.2 三指针 + 从后向前 代码优化
function merge(nums1, m, nums2, n) {
  // 易错点1: 只要nums2都被处理即可，多余超出的nums1已经有序了
  while (n > 0) {
    // 易错点2: 比较时应该拿当前的索引值进行比较，比较后才更新m/n
    nums1[m + n - 1] = nums1[m-1] > nums2[n-1] ? nums1[--m] : nums2[--n]
  }
  return nums1
}
```

## 参考文档

[官方解答](https://leetcode-cn.com/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-leetco-rrb0/)

[逆向指针图示](https://leetcode-cn.com/problems/merge-sorted-array/solution/ni-xiang-shuang-zhi-zhen-he-bing-liang-g-ucgj/)

[代码实现 直接参考](https://leetcode-cn.com/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-xiao-y-8dzf/)