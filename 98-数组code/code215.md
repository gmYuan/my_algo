# LeetCode215- 数组中的第K个最大元素

## 实现思路

方法1: 双路/三路快排 + 二分剪枝

方法2: 优先队列，待完善


参考实现:  <br/>
[01 官方参考实现](https://leetcode.cn/problems/kth-largest-element-in-an-array/solutions/307351/shu-zu-zhong-de-di-kge-zui-da-yuan-su-by-leetcode-/)


## 代码实现

方法1.1: 双路快排 + 二分剪枝   时间复杂度: O(n)  空间复杂度: O(log⁡n)

```ts
function findKthLargest(nums, k) {
  // 易错点1: 理解题意，第k大的元素，升序表示时的下标必然是len-k
  const kdx = nums.length - k
  return quickFind(nums, 0, nums.length -1, kdx)
};

function quickFind(arr, l, r, kdx) {
  // 这句话也可能不写，但是运行到l===r时，经过拆分必然是l===r===kdx的情况，所以提前返回即可
  if(l === r) return arr[l];
  const p = partition(arr, l, r)
  if (p === kdx) return arr[p];
  if (p < kdx) {
    return quickFind(arr, p+1, r, kdx)
  } else {
    return quickFind(arr, l, p-1, kdx)
  }
}

function partition(arr, l, r) {
  const rdx = Math.floor(Math.random() * (r - l + 1)) + l
  swap(arr, l, rdx)
  // 易错点2: 保证性质: [l+1, i)都<=x, (j, r]都>=x
  let x = arr[l], i = l + 1, j = r
  while (1) {
    while (arr[i] < x) i++;
    while (arr[j] > x) j--;
    if (i >= j) break;
    swap(arr, i++, j--);
  }
  // 到此时必然满足 [l+1, i)都<=x, (j, r]都>=x， 且 此时i === j
  // 此时交换l和j后，就必然可以满足 [j,r]都>=x了 + 而原来arr[j]的值也是<=x的，放到最左边后就会满足[l, i-1]<=x
  swap(arr, l, j)
  return j
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]]
}
```


方法1.2 三路快排 + 二分剪枝   时间复杂度: O(n)  空间复杂度: O(log⁡n)

```ts
function findKthLargest(nums, k) {
  // 易错点1: 理解题意，第k大的元素，升序表示时的下标必然是len-k
  const kdx = nums.length - k;
  return quickFind(nums, 0, nums.length - 1, kdx);
}

function quickFind(arr, l, r, kdx) {
  // partiton过程
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, rdx);
  // 保证 [l+1, lt]都<x;  [lt+1, gt-1) 都===x;  [gt, r]都>x
  let x = arr[l], lt = l, gt = r + 1, i = l + 1;
  while (i < gt) {
    if (arr[i] < x) {
      // lt+1后再交换i和j, 由于arr[lt+1]比如===x, 所以交换后的arr[i]是===x的，所以i直接后移处理下一个即可
      swap(arr, ++lt, i++)
    } else if (arr[i] === x) {
      i++
    } else {
      // arr[i]>x时，把gt-1前移，再和i交换，由于gt-1前一个元素不知道和x的大小关系，所以i不能移动需要继续处理
      swap(arr, --gt, i)
    }
  }
  // 把lt和l交换，从而 最后新保证 arr[l, lt-1]都<x, [lt, gt-1都]===x, [gt, r]都>x
  swap(arr, l, lt);

  // 二分递归
  if (kdx >= lt && kdx <= gt-1) return arr[lt];
  if (kdx < lt) {
    return quickFind(arr, l, lt-1, kdx)
  } else {
    return quickFind(arr, gt, r, kdx)
  }
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}


// 以下写法也是可以的
/**
function findKthLargest(nums, k) {
  const kdx = nums.length - k;
  return quickFind(nums, 0, nums.length - 1, kdx);
}

function quickFind(arr, l, r, kdx) {
  // partiton过程
  let rdx = Math.floor(Math.random() * (r - l + 1)) + l;
  swap(arr, l, rdx);
  // 保证 [l+1, lq)都<x;  [lq, gt/i) 都===x;  [gt, r]都>x
  let x = arr[l], lq = l + 1, gt = r + 1, i = l + 1;
  while (i < gt) {
    if (arr[i] === x) {
      i++
    } else if (arr[i] < x) {
       // 交换i和j, 由于arr[lq]===x, 所以交换后的arr[i]是===x的，所以i直接后移处理下一个即可
       // 由于lq是 === x的，因此需要把 lq向后移动一位以保持 [l+1, lq) < x的性质
      swap(arr, lq++, i++)
    } else {
      // arr[i]>x时，把gt-1前移，再和i交换，由于gt-1前一个元素不知道和x的大小关系，所以i不能移动需要继续处理
      swap(arr, --gt, i)
    }
  }
  // 先--lq后，再和l交换，从而 最后也能保证 arr[l, lq-1]都<x, [lq, gt-1都]===x, [gt, r]都>x
  // 易错点，要是--lq, 而不是lq--
  swap(arr, l, --lq);

  // 二分递归
  if (kdx >= lq && kdx <= gt-1) return arr[lq];
  if (kdx < lq) {
    return quickFind(arr, l, lq-1, kdx)
  } else {
    return quickFind(arr, gt, r, kdx)
  }
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}
 * 
 */
```