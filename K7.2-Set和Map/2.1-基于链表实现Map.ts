/** 

LinkedListMap的 数据结构
  node(key, value, next)
  size
  dummyHead

LinkedListMap的 API
  S1 getSize()
  S2 isEmpty()

  S3 getNode(key): curNode + 循环更新curNode(curNode = curNode.next)
  S4 contains(key)
  S5 getVal(key)
  
  S6 add(key, value): 之前不存在则 不断前移dummyHead来新增节点(dummyHead.next = new Node(ke,value, dummyHead.next));存在则 更新
  S7 set(key, value): 之前不存在 则 报错； 存在则 更新值
  S8 remove(key):  preNode + 循环更新preNode +  (preNode.next = delNode.next + delNode.next = null) 

**/

export {};

class node {
  key: any;
  value: any;
  next: node;
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class LinkedListMap {
  dummyHead: node;
  size: number;
  constructor() {
    this.dummyHead = new node();
    this.size = 0;
  }
  // S1
  getSize() {
    return this.size;
  }
  // S2
  isEmpty() {
    return this.size === 0;
  }
  // S3
  getNode(key) {
    let curNode = this.dummyHead.next;
    while (curNode) {
      if (curNode.key === key) {
        return curNode;
      }
      curNode = curNode.next;
    }
    return null;
  }

  // S4
  contains(key) {
    const curNode = this.getNode(key);
    return !!curNode;
  }

  // S5
  getVal(key) {
    const curNode = this.getNode(key);
    return curNode.value;
  }

  // S6 之前不存在则 不断前移dummyHead来新增节点(dummyHead.next = new Node(ke,value, dummyHead.next)); 
  // 存在则 更新
  add(key, value) {
    let curNode = this.getNode(key);
    if (!curNode) {
      this.dummyHead.next = new node(key, value, this.dummyHead.next);
      this.size++;
    } else {
      curNode.value = value;
    }
  }

  // S7 之前不存在 则 报错； 存在则 更新值
  set(key, value) {
    let curNode = this.getNode(key);
    if (!curNode) {
      throw new Error("set更新失败: key不存在");
    }
    curNode.value = value;
  }

  // S8  preNode + 循环更新preNode +  (preNode.next = delNode.next + delNode.next = null)
  remove(key) {
    let preNode = this.dummyHead;
    while (preNode.next) {
      if (preNode.next.key === key) {
        break;
      }
      preNode = preNode.next;
    }
    if (preNode.next) {
      let delNode = preNode.next;
      preNode.next = delNode.next;
      delNode.next = null;
      this.size--;
      return delNode.value;
    }
    return null;
  }

}
