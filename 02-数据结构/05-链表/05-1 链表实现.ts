// S1 LinkNode: val + next
// S2 LinkedList: dummy + size

// S3 addNode: 容错判断 + 获取到pre + 更新pre.next 和 size值

// S4 getNode/setNode/checkContains:  curNode，其他基本同addNode
// S5 delNode: 容错判断 + 递归获取到preNode + 更新preNode.next 和 currentNode值 和 size值

class LinkNode<E> {
  val: E;
  next: LinkNode<E>;
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList<E> {
  dummy: LinkNode<E>;
  size: number;
  constructor() {
    this.dummy = new LinkNode();
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  // 在index前 插入节点
  addNode(index: number, val: E) {
    if (index < 0 || index > this.size) {
      throw new Error("index非法");
    }
    let pre = this.dummy;
    for (let i = 0; i < index; i++) {
      pre = pre.next;
    }
    //即 let node = new LinkNode(val) + node.next = pre.next +  pre.next = node
    pre.next = new LinkNode(val, pre.next);
    this.size++;
  }

  addFirst(val: E) {
    this.addNode(0, val);
  }

  addLast(val: E) {
    this.addNode(this.size, val);
  }
}









// class LinkedList2 {


//   // 查询操作
//   getNode(index) {
//     if (index < 0 || index > this.size) {
//       throw new Error("index值违法");
//     }
//     let currentNode = this.dummyHead.next;
//     for (let i = 0; i < index; i++) {
//       currentNode = currentNode.next;
//     }
//     return currentNode.data;
//   }

//   getFirst() {
//     this.getNode(0);
//   }

//   getLast() {
//     this.getNode(this.size - 1);
//   }

//   setNode(data, index) {
//     if (index < 0 || index > this.size) {
//       throw new Error("index非法");
//     }
//     let curNode = this.dummyHead.next;
//     for (let i = 0; i < index; i++) {
//       curNode = curNode.next;
//     }
//     curNode.data = data;
//   }
//   // 查询链表中是否含有 data值
//   checkContains(data) {
//     let curNode = this.dummyHead.next;
//     while (curNode) {
//       if (data === curNode.data) return true;
//       curNode = curNode.next;
//     }
//     return false;
//   }

//   // 删除index位置的Node
//   delNode(index) {
//     if (index < 0 || index > this.size) throw new Error("index非法");
//     let preNode = this.dummyHead;
//     for (let i = 0; i < index; i++) {
//       preNode = preNode.next;
//     }

//     let currentNode = preNode.next;
//     let res = currentNode.data;
//     // 更新preNode的next指向
//     preNode.next = currentNode.next;
//     currentNode = null;
//     this.size--;
//     return res;
//   }

//   delFirst() {
//     return this.delNode(0);
//   }
//   // size-1才是当前链表中的最后一个元素
//   delLast() {
//     return this.delNode(this.size - 1);
//   }
// }
