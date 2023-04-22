# LeetCode88- 合并两个有序数组

## 实现思路

关键词: 2个【有序】数组 排序; m为nums1的有效数字

方法1: 同向头指针 + 数组空间拷贝

方法2: 同向尾指针

参考实现:  <br/>

[01 尾指针实现示意图](https://leetcode.cn/problems/merge-sorted-array/solution/88-by-ikaruga/)

[02 官方实现](https://leetcode.cn/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-leetco-rrb0/)

## 代码实现

方法1: 同向头指针  时间复杂度:O(m+n); 空间复杂度: O(m)

```ts
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // 2个递增有序数组 排序，m为nums1的有效数字
  // 同向头指针 + 数组空间拷贝
  let p1 = 0, p2 = 0, i = 0, copy1 = [...nums1]
  for (let i = 0; i < m + n; i++) {
	  if (p1 < m && p2 < n) {
			nums1[i] = copy1[p1] < nums2[p2] ? copy1[p1++] : nums2[p2++]
	  } else {
			nums1[i] = p1 === m ? nums2[p2++] : copy1[p1++]
		}
  }
};
```

方法2 同向尾指针  时间复杂度:O(m+n); 空间复杂度: O(1)
```ts
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
	let t1 = m - 1, t2 = n - 1, i = m + n - 1
  // 注意点1: 只要nums2都处理完毕，剩下的nums1必然是有序的了
	while (t2 >= 0) {
    // 注意点2: 如果nums1都处理完了，只要让nums2剩下的合并到结果即可
		if (t1 < 0) {
			nums1[i--] = nums2[t2--]
		} else {
			nums1[i--] = nums1[t1] < nums2[t2] ? nums2[t2--] : nums1[t1--]
		}
	}
}
```