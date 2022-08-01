# LeetCode234- 回文链表

## 图示参考

[01 方法1参考](https://leetcode.cn/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode-solution/)

[02 方法2参考](https://leetcode.cn/problems/palindrome-linked-list/solution/234-hui-wen-lian-biao-by-jue-qiang-zha-z-2x29/)

## 代码实现

方法1: 中点反转法  时间复杂度 O(n)  空间复杂度：O(1)

```ts
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true
  // 查找到中点
  let mid = getMid(head)
  let h2 = mid.next
  // 断开链表
  mid.next = null
  // 反转右侧链表
  let newH2 = reverse(h2)
  let tempnewH2 = reverse(h2)
  // 比较是否相等
  while (head && newH2) {
    if (head.val !== newH2.val) return false
    head = head.next
    newH2 = newH2.next
  }
   
  // 可选步骤，再次反转节点，恢复链表
  mid.next = reverse(tempnewH2)

  // 返回结果
  return true
};

function getMid(head: ListNode) {
  let slow = head, fast = head
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

function reverse(head: ListNode) {
  let pre = null
  let cur = head
  while (cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
}
```

方法2: 递归回溯法

```ts
let curLeft: ListNode

function isPalindrome(head: ListNode | null): boolean {
  curLeft = head
  return helper(head)
};

function helper(head) {
  // 递归定义： 判断是否是 回文链表
  // 递归终止条件
  if (!head) return true
  // 递阶段： 更新head值; 归阶段：比较head和curLeft是否相等 + 更新curLeft值
  let res = helper(head.next)
  if (curLeft.val !== head.val) return false
  curLeft = curLeft.next
  // 返回单次 递归的结果
  return res
}
```

方法3: Hash法，没看懂，留做备份

[Hash法](https://leetcode.cn/problems/palindrome-linked-list/solution/ha-xi-bian-li-yi-ci-jiu-xing-by-tcan1993/)

