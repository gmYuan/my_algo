/** 
BSTMap 
  node(key, value, left, right)

  size
    S1 getSize()
    S2 isEmpty()

  S3 add(key,value)：node为null时返回新增node + 递归更新 node.left/node.right
  S4 getNode(node, key)： node为null时 返回null + 递归二分查找 node.left/node.right  ==> contains(key)/get/set(key)
  S5 remove(key): node为null时 返回null + 递归查找 node.left/node.right/相等情况 + 相等时区分 单子节点 和 双子节点
 
**/

class node {
  key: any
  value: any
  left: node
  right: node
  constructor(key=null, value=null, left=null, right=null) {
    this.key = key
    this.value = value
    this.left = left
    this.right = right
  }
}

class BSTMap {
  root: node
  size: number
  constructor() {
    this.root = null
    this.size = 0
  }

  // S1
  getSize() {
    return this.size
  }
  // S2
  isEmpty() {
    return this.size === 0
  }

  // S3 node为null时返回新增node + 递归更新 node.left/node.right
  add(key, value) {
    this.root = this.innerAdd(this.root, key, value)
  }
  //  返回node2根节点
  innerAdd(node2: node, key: any, value: any) {
    if (node2 == null) {
      // 不要忘记更新 size值
      this.size++
      return new node(key, value)
    }
    if (key < node2.key) {
      node2.left = this.innerAdd(node2.left, key, value)
    } else if (key > node2.key) {
      node2.right = this.innerAdd(node2.right,key, value)
    } else {
      node2.value = value
    }
    return node2
  }

   //S4  返回以node2为根节点的二分搜索树中，key所在的节点
   getNode(node2: node, key: any) {
     if (node2 == null) {
       return
     }

     if (key < node2.key) {
       // 没有return的话，默认返回值就是undefined
       return this.getNode(node2.left, key)
     } else if (key > node2.key) {
       return this.getNode(node2.right, key)
     } else {
       return node2
     }
   }

  contains(key) {
    const curNode = this.getNode(this.root, key)
    return  !!curNode 
  }

  get(key) {
    const curNode = this.getNode(this.root, key)
    return  curNode.value
  }

  set(key, value) {
    const curNode = this.getNode(this.root, key)
    if (!curNode) {
      throw new Error('key 不存在')
    }
    curNode.value = value
  }
  
  
  //S5 从二分搜索树中删除键为key的节点, 返回值为该节点的值
  remove(key) {
    // S5.1 是否存在待删除节点
    const curNode = this.getNode(this.root, key)
    if (!curNode) {
      return null
    }

    this.root = this.innerRemove(this.root, key)
    return curNode.value
  }

  //S5.2 返回删除了目标节点的 根节点
  innerRemove(node2, key): node {
    if (node2 == null) {
      return null
    }

    if (key < node2.key) {
      node2.left = this.innerRemove(node2.left, key)
      return node2
    } else if (key > node2.key) {
      node2.right = this.innerRemove(node2.right, key)
      return node2
    } else {
      //S5.3 相等情况: 讨论是单子节点 还是  双子节点
      if (node2.left == null) {
        const rightNode = node2.right
        node2.right = null
        this.size--
        // 单子节点直接返回 该子节点即可
        return rightNode
      } else if (node2.right == null) {
        const leftNode = node2.left
        node2.left = null
        this.size--
        return leftNode
      } else {
        //S5.4  双子节点: 找到右子树中的 最小节点 + 用这个节点顶替待删除节点的位置
        const successor = this.minNode(node2.right)
        successor.left = node2.left
        successor.right = this.removeMin(node2.right)
        node2.left = node2.right = null
        return successor
      }
    }
  }

  //S5.5  返回以node3为根的 二分搜索树的最小值  所在的节点
  minNode(node3): node {
    if (node3.left == null) {
      return node3
    }
    return  this.minNode(node3.left)
  }

  //S5.6 删除以node3为根的二分搜索树中的最小节点, 返回删除节点后的 新的二分搜索树的根
  removeMin(node3): node {
    if (node3 == null) return null;
    if (node3.left == null) {
      const rightNode = node3.right
      node3.right = null
      this.size--
      return rightNode
    }
    node3.left = this.removeMin(node3.left)
    return node3

  }
   
}