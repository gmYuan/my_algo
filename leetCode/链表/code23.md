
# LeetCode23- 合并K个升序链表

## 图示参考

[01 方法参考](https://leetcode.cn/problems/merge-k-sorted-lists/solution/he-bing-kge-pai-xu-lian-biao-by-leetcode-solutio-2/)



## 代码实现

方法1: 顺序合并  时间复杂度 O(k^2 * n)  空间复杂度O(1)
```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let res = null
  for (let list of lists) {
    res = mergeTwoList(res, list)
  }
  return res
};

function mergeTwoList(list1: ListNode, list2: ListNode): ListNode {
  if (!list1 || !list2) {
    return list1 || list2
  }
  let dummy = new ListNode()
  let curRes = dummy, curL1 = list1, curL2 = list2
  while (curL1 && curL2) {
    if (curL1.val <= curL2.val) {
      curRes.next = curL1
      curL1 = curL1.next
    } else {
      curRes.next = curL2
      curL2 = curL2.next
    }
    curRes = curRes.next
  }
  curRes.next = curL1 ? curL1 : curL2
  return dummy.next
}
```


方法2: 分治合并 时间复杂度 O(kn * logk)  空间复杂度O(logk)

```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  return inner(lists, 0, lists.length - 1)
};

function inner(lists: ListNode[], left: number, right: number) {
  if (left === right) {
    return lists[left]
  }
  let mid = left + right >> 1
  let list1 = inner(lists, left, mid)
  let list2 = inner(lists, mid+1, right)
  return mergeTwoList(list1, list2)
}

function mergeTwoList(list1: ListNode, list2: ListNode): ListNode {
  if (!list1 || !list2) {
    return list1 || list2
  }
  let dummy = new ListNode()
  let curRes = dummy, curL1 = list1, curL2 = list2
  while (curL1 && curL2) {
    if (curL1.val <= curL2.val) {
      curRes.next = curL1
      curL1 = curL1.next
    } else {
      curRes.next = curL2
      curL2 = curL2.next
    }
    curRes = curRes.next
  }
  curRes.next = curL1 ? curL1 : curL2
  return dummy.next
}
```


方法3: 优先队列  时间复