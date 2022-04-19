/**
 * 二分搜索树
 * 
 * 功能：
 * S1 实现二分搜索数结构的 增删改查
 *
 * 实现步骤-递归版：
 * S1 构建节点基本结构：key+value +left+right + 初始化根节点root
 * S2 insert(node, key, value)：通过比较key，来确定新增节点 在node的左分支/右分支
 * S3 search(key) / contains(key)：基本思路同insert
 * 
 * S4 深度优先遍历：前序/中序/后序遍历-- 递归实现
 * S5 广度优先/层序遍历：队列 + 依次出队&处理当前节点
 * 
 * S6 获取最值节点的key：递归找到最左分支节/最右分支节点
 * S7 删除最值节点：递归找到最左分支节/最右分支节点 + 使用其右子节点/左子节点
 * S8 删除节点：获取后继节点s + 分别设置s.left和s.right + 删除目标节点 
 * 
 * 
 * ![深度优先](https://gitee.com/ygming/blog-img/raw/master/img/bst1.jpeg)
 * ![广度优先](https://gitee.com/ygming/blog-img/raw/master/img/bst2.jpeg)
 * ![删除节点](https://gitee.com/ygming/blog-img/raw/master/img/bst3.jpeg)
 *        
 **/


class TNode {
  key: any
  value: any
  left: TNode
  right: TNode
  // S1 构造节点结构
  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = this.right = null
  }
}

class BST {
  root : TNode
  count: number
  // S1 初始化根节点
  constructor(arr, target) {
    this.root = null
    this.count = 0
  }

  // 返回二分搜索树的节点个数
  size() {
    return this.count
  }
  // 返回二分搜索树是否为空
  isEmpty() {
    return this.count === 0
  }

  // 向二分搜索树中插入一个 新的(key, value)数据对
  insert(key, value) {
    this.root = this.innerInsert(this.root, key, value)
  }
  //S2 向以node为根的二分搜索树中, 插入节点(key, value), 使用递归算法
  //    返回插入新节点后的二分搜索树的根
  innerInsert(node, key, value) {
    if (node == null) {
      this.count++
      return new TNode(key, value)
    }
    if (node.key == key) {
      node.value = value
    } else if (key < node.key) {
      node.left = this.innerInsert(node.left, key, value)
    } else {
      node.right = this.innerInsert(node.right, key, value)
    }
    return node
  }

  //S3.1 查看二分搜索树中是否存在键key
  contains(key) {
    return this.innerContains(this.root, key)
  }
  innerContains(node, key) {
    if (node == null) return false
    if (node.key == key) {
      return true
    } else if (key < node.left) {
      return this.innerContains(node.left, key)
    } else {
      return this.innerContains(node.right, key)
    }
  }
  //S3.2 在二分搜索树中搜索键key所对应的值。如果这个值不存在, 则返回null
  search(key){
    return this.innerSearch(this.root, key )
  }
  innerSearch(node, key) {
    if (node == null) return null
    if (node.key == key) {
      return node.value
    } else if (key < node.left) {
      return this.innerSearch(node.left, key)
    } else {
      return this.innerSearch(node.right, key)
    }
  }

  // S4.1 前序遍历：先处理节点A，再分别处理其左右子节点
  preOrder() {
    this.innerPerOrder(this.root)
  }
  innerPerOrder(node) {
    if (!node) return
    // 优先处理本节点
    console.log(node.key)
    this.innerPerOrder(node.left)
    this.innerPerOrder(node.right)
  }
  // S4.2 中序遍历：先处理左子节点，再处理节点A，最后处理右子节点
  // 中序遍历返回的结果，是升序排好序的
  inOrder() {
    this.innerInOrder(this.root)
  }
  innerInOrder(node) {
    if (!node) return
    this.innerInOrder(node.left)
    console.log(node.key)
    this.innerInOrder(node.right)
  }
  //S4.3 后序遍历：优先处理左右子节点，最后再处理节点A
  postOrder() {
    this.innerPostOrder(this.root)
  }
  innerPostOrder(node) {
    if (!node) return
    this.innerPostOrder(node.left)
    this.innerPostOrder(node.right)
    // 最后处理节点A本身
    console.log(node.key)
  }

  //S5 层序遍历
  levelOrder() {
    const queue = []
    queue.push(this.root)
    while(queue.length) {
      const curNode = queue.shift()
      if (!curNode) return

      console.log(curNode.key)
      if (curNode.left) {
        queue.push(curNode.left)
      }
      if (curNode.right) {
        queue.push(curNode.right)
      }   
    }
  }

  // S6 获取二分树中的最小值的键值
  getMin() {
    if (this.root) {
      const minNode = this.innerGetMin(this.root)
      return minNode.key
    }
  }
  // 获取以node为根节点的二分树中的最小值节点，返回这个最小值节点
  innerGetMin(node) {
    if (node.left == null) {
      return node
    }
    this.innerGetMin(node.left)
  }
  // S6 获取二分树中的最大值的键值
  getMax() {
    if (this.root) {
      this.innerGetMax(this.root)
    }
  }
  innerGetMax(node) {
    if (node.right == null) {
      return node
    }
    this.innerGetMax(node.right)
  }

  // S7 删除最小值节点
  removeMin() {
    if (this.root) {
      this.root = this.innerRemoveMin(this.root)
    }
  }
  // 删除以node为根节点的二分树中的最小值节点，返回删除后的 新的根节点
  innerRemoveMin(node) {
    if (node.left == null) {
      const rightNode = node.right
      node.right = null
      this.count--
      return rightNode
    }
    node.left = this.innerRemoveMin(node.left)
    return node
  }
  //S7 删除最大值节点
  removeMax() {
    if (this.root) {
      this.innerRemoveMax(this.root)
    }
  }
  innerRemoveMax(node) {
    if (node.right == null) {
      const leftNode = node.left
      node.left = null
      this.count--
      return leftNode
    }
    node.right = this.innerRemoveMax(node.right)
    return node
  }

  // S8 删除节点
  remove(key) {
    this.root = this.innerRemove(this.root, key)  
  }
  // 删除掉以node为根的二分搜索树中键值为key的节点, 递归算法
  // 返回删除节点后新的二分搜索树的根
  innerRemove(node, key) {
    if (node == null) return null

    if (node.key === key) {
      // 只有 右子节点
      if (node.left == null) {
        const rightNode = node.right
        node.right = null
        this.count--
        return rightNode
      }
      // 只有 左子节点
      if (node.right == null) {
        const leftNode = node.left
        node.left = null
        this.count--
        return leftNode
      }
      // 左右子节点都存在
      const succNode = this.innerGetMin(node.right)
      succNode.left = node.left
      succNode.right = this.innerRemoveMin(node.right)
      node.left = node.right = null
      this.count--
      return succNode

    } else if (key > node.key) {
      node.right = this.innerRemove(node.right, key)
      return node
    } else if (key < node.key) {
      node.left = this.innerRemove(node.left, key)
      return node
    }
  }

}
