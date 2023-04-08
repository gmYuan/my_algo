class ListNode {
  constructor(val, next) {
        this.val = (val=== undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function listToLink(arr) {
    let dummy = new ListNode(0)
    let cur = dummy
    for (let val of arr) {
        cur.next = new ListNode(val)
        cur = cur.next
    }
    return dummy.next
}

const head = listToLink([1,2,3,4])


// 功能代码
function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return
    // 找到中点
    let mid = getMid(head)
    let h1 = head
    let h2 = mid.next
    // 断开链表
    mid.next = null
    // 反转右半部分链表
    let newH2 = reverse(h2)
    // 连接左右部分的链表
    merge(h1, newH2)

};

function getMid(head: ListNode) {
    let slow = head
    let fast = head
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

function merge(l1: ListNode, l2: ListNode) {
    // let l1Temp, l2Temp
    // while (l1 && l2) {
    //     l1Temp = l1.next
    //     l2Temp = l2.next
        
    //     l1.next = l2
    //     l1 = l1Temp

    //     l2.next = l1
    //     l2 = l2Temp
    // }

    let dummy = new ListNode()
    let cur = dummy
    if (l1 && l2) {
        cur.next = l1
        cur.next.next = l2
        cur = cur.next.next
        
        l1 = l1.next
        l2 = l2.next
    }
    return dummy.next
}

reorderList(head)