/**
 * 二分搜索树
 * 功能：实现二分搜索数结构的 增删改查
 *
 **/

export {}

class TNode {
  data: number | undefined
  left: TNode
  right: TNode
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class BST {
  root: TNode | null
  size: number
  constructor() {
    this.root = null
    this.size = 0
  }

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  // 向二分搜索树中添加元素
  // 因为使用时只会传入data值，所以需要用addNodeImp来内部创建 二分搜索树的节点结构
  addNode(data) {
    this.root = this.addNodeImp(this.root, data)
  }

  // 向 以node为根的二分搜索树中 插入元素
  // 返回插入新节点后 二分搜索树的根
  addNodeImp(node, data) {
    if (node == null) {
      this.size++
      return new node(data)
    }
    // 当前值小于node节点值，加入为 左孩子节点
    if (data < node.data) {
      node.left = this.addNodeImp(node.left, data)
    } else if (data > node.data) {
      node.right = this.addNodeImp(node.right, data)
    }
    return node
  }
  

}



