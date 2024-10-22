/** 

1 题目最直观目标：在nums里找到[a, b]区间，使得 nums[a~b]的区间和 >= target，且b-a尽可能小


2 利用【前缀和概念】，第1次 转化问题==>
  - 前缀和数组sums[i]表示 前i个元素的和
	- nums[a~b]的区间和 可以被表示为 sums[b] - sums[a-1]，原因是: 
	  - sums[b]表示    nums[0~b]的    所有元素的和
	  - sums[a-1]表示  nums[0~a-1]的  所有元素的和
	  - 所以 sums[b] - sums[a-1] 就表示 nums[a~b]间的 元素和

	- 所以，问题就被转化成: 在sums前缀和里，找到 sums[b] - sums[a-1] >= target时的 最小的b
  - 即【目标1】==> 遍历sums里的 每个左端点i，如何找到每一轮里 最小的b，使得 sum[b] - sum[i-1] >= target


3.1 利用【前缀和的单调性】，第2次 转化问题==> 
	- 由于 b 和 sum[b] 是单调递增的，所以只要找到 sum[b]的最小值，就能找到b的最小值
  - 所以问题再次转化为【目标2】==> sum[b] 的最小值要怎么找呢
  

3.2 从上文目标1可知，sum[b] - sum[i-1] >= target， 所以 sum[b]就可以转化为 sum[b] >= target + sum[i-1]
  - 也就是说，如果我们把 target + sum[i-1] 记作t， 那么 sum[b] >= t 时最小值对应的b，就是我们要找的b
	- 所以我们可以通过二分查找，找到满足条件的 最小的b
	- 此时 [a, b]的区间内的 成员个数就是 b - a + 1

*/

function minSubArrayLen(target: number, nums: number[]): number {
  let n = nums.length, res = Number.MAX_VALUE;

  // S1 创建前缀和数组，注意sum[y]表示 前y个元素的和,所以是从1开始的
  let sums = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    sums[i] = sums[i - 1] + nums[i - 1];
  }

  // S2 遍历sums数组左端点, 对一个子数组[i, b]，都尝试寻找满足条件的 最小右端点b + 记录可能的最优解区间长度
  for (let i = 1; i <= n; i++) {
		// S3.1 利用前缀和的单调性， 把 sum[b] - sum[i-1] >= target 转化为 sum[b] >= sum[i+1] + target (记作t)
		// 易错点1: 假设nums时的区间和下标是[i, b]，那么sums里的区间下标就是[i-1, b]
    const t = target + sums[i - 1];

		//S3.2 利用二分查找，找到满足条件的 最小右端点b
    let bound: number = minUpper(sums, t);

		// S3.3 记录满足条件的最小右端点b 对应的区间长度
		// 易错点2: bound要在 <=n的限制下
		// 易错点3: 子区间长度计算方法: 右边界下标 - 左边界下标 + 1
    if (bound <= n) {
      res = Math.min(res, (bound - i + 1));
    }
  }
  return res === Number.MAX_VALUE ? 0 : res;
}

// 寻找arr里 大于等于target的 最小值
function minUpper(arr: number[], target: number): number {
  let l = 0,  r = arr.length - 1;
  while (l < r) {
    const mid = (l + r)  >> 1;
		if (arr[mid] >= target) r = mid;
    else l = mid + 1;
  }
  // 易错点4: 当arr里所有元素都 <target时，这里会返回arr.length, 而不是-1
	// 是为了让 S3.2里 bound值不会错误的满足 <=n，导致误更新res
  return arr[r] >= target ? r : arr.length;
}
