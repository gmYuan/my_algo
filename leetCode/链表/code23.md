
# LeetCode23- 合并K个升序链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/merge-k-sorted-lists/solution/duo-tu-yan-shi-23-he-bing-kge-pai-xu-lian-biao-by-/)

[02 方法2参考](https://leetcode.cn/problems/merge-k-sorted-lists/solution/4-chong-fang-fa-xiang-jie-bi-xu-miao-dong-by-sweet/)




## 代码实现

方法1: 分治合并-递归实现 时间复杂度 O(kn * logk)  空间复杂度O(logk)

```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  return inner(lists, 0, lists.length - 1)
};

// 缩小规模的思路：合并k个链表 ==> 合并1个/合并2个有序链表
//递归含义: 合并lists[left]~lists[right]范围内的链表
function inner(lists: ListNode[], left: number, right: number) {
  if (left === right) {
    return lists[left]
  }
  let mid = left + right >> 1
  let lSorted = inner(lists, left, mid)
  let rSorted = inner(lists, mid+1, right)
  return mergeTwoList(lSorted, rSorted)
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


方法2: 分治合并-迭代实现 时间复杂度 O(kn * logk)  空间复杂度O(logk)

```ts
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || !lists.length) return null
  // 自底向上分治合并：每2个为单位（步长）进行合并，每次合并都把后一个链表，合并到前一个链表中
  // 当前链表的个数，随着自底向上分治合并，当前链表的个数会以 每次logk的速度减小
  let curLength = lists.length

  while (curLength > 1) {
    // 每轮归并时，已经归并了的链表个数，它同时也是下一轮归并时，当前链表的个数
    let sortedIndex = 0
    for (let i =0; i < curLength; i+=2) {
      // 每轮分治最后剩余的单独1个链表，作为单独的1组链表返回即可
      if (i === curLength-1) {
        lists[sortedIndex] = lists[i]
        sortedIndex++
      } else {
        lists[sortedIndex] = mergeTwoLists(lists[i], lists[i+1])
        sortedIndex++
      }
    }
    curLength = sortedIndex
  }
  // 最后归并的结果，都在第1个链表里
  return lists[0]
};

function mergeTwoLists(l1: ListNode, l2: ListNode): ListNode {
  if (!l1 || !l2) return l1 || l2
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
```