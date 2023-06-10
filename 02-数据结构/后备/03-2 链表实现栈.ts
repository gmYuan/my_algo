// S1 LinkedNode: data + next
// S2 LinkedList: dummyHead + size

// S3 addNode: 容错判断 + 递归获取到preNode + 更新preNode.next和size值
// S4 getNode/setNode/checkContains:  curNode，其他基本同addNode
// S5 delNode: 容错判断 + 递归获取到preNode + 更新preNode.next 和 currentNode值 和 size值



class LinkedNode {
    data: any
    next: any
    constructor(data=null, next=null) {
        this.data = data;
        this.next = next
    }
}

class LinkedList {
    dummyHead: LinkedNode;
    size: number;
    constructor() {
        this.dummyHead = new LinkedNode()
        this.size = 0
    }

    isEmpty() {
        return this.size === 0
    }

    getSize() {
        return this.size
    }

    // 在Index前 插入节点
    addNode(data, index) {
        if(index < 0 || index > this.size) {throw new Error('index非法')}
        let preNode = this.dummyHead
        for(let i = 0; i < index; i++) {
            preNode = preNode.next
        }
        //即  let node = new LinkedNode(data) +  node.next = preNode.next + preNode.next = node
        preNode.next = new LinkedNode(data, preNode.next)
        this.size++
    }

    addFirst(data) {
        this.addNode(data, 0)
    }

    addLast(data) {
        this.addNode(data, this.size)
    }

    // 查询操作
    getNode(index) {
        if (index < 0 || index > this.size) { throw new Error('index值违法') }
        let currentNode = this.dummyHead.next
        for(let i = 0;  i < index; i++) {
            currentNode = currentNode.next
        }
        return currentNode.data
    }

    getFirst() {
        this.getNode(0)
    }

    getLast() {
        this.getNode(this.size-1)
    }
    
    setNode(data, index) {
        if (index < 0 || index > this.size) {  throw new Error('index非法') }
        let curNode = this.dummyHead.next
        for(let i = 0; i< index; i++) {
            curNode  = curNode.next
        }
        curNode.data = data
    }
   // 查询链表中是否含有 data值
    checkContains(data) {
        let curNode = this.dummyHead.next
        while(curNode) {
            if (data === curNode.data) return true
            curNode = curNode.next
        }
        return false
    }

    // 删除index位置的Node
    delNode(index) {
        if (index < 0 || index > this.size) throw new Error('index非法')
        let preNode = this.dummyHead
        for(let i = 0; i < index; i++) {
            preNode = preNode.next
        }

        let currentNode = preNode.next
        let res = currentNode.data
        // 更新preNode的next指向    
        preNode.next = currentNode.next
        currentNode = null
        this.size--
        return res
    }

    delFirst() {
        return this.delNode(0)
    }
    // size-1才是当前链表中的最后一个元素
    delLast() {
        return this.delNode(this.size-1)
    }
}

// 用链表实现栈: 链表头进，链表头出即可，复杂度为O(1)
class LinkedListStack {
    stack: LinkedList;
    constructor() {
        this.stack = new LinkedList()
    }
   
    getSize() {
        return this.stack.getSize()
    }
    isEmpty() {
        return this.stack.isEmpty()
    }

    push(data) {
        return this.stack.addFirst(data)
    }
    pop() {
        return this.stack.delFirst()
    }
    peek() {
        return this.stack.getFirst()
    }
}