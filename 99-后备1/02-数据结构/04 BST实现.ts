class node {
  data: any
  left: any
  right: any
  constructor(data = undefined) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class BST {
  root: any
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

  // 因为使用时只会传入data值，所以需要用addNodeInner来内部创建 二分搜索树的节点结构
  addNode(data) {
    this.root = this.addNodeInner(this.root, data)
  }

  // 向二分搜索树节点node中 新增节点
addNodeInner(node2, data) {
    if (node2 == null) {
      this.size++
      return new node(data)
    }
    // 当前值小于node节点值，加入为 左孩子节点
    if (data < node2.data) {
      node2.left = this.addNodeInner(node2.left, data)
    } else if (data > node2.data) {
      node2.right = this.addNodeInner(node2.right, data)
    }

    return node2
  }

  // 检测树中是否存在data值
  contains(data) {
    this.innerContains(this.root,  data)
  }
  innerContains(node, data) {
    if (node == null) return false
    if (node.data === data)  return true
    // 递归遍历要返回其 内部值，否则就无返回值了
    if (data < node.data) {
      return this.innerContains(node.left, data)
    } else if (data > node.data) {
      return this.innerContains(node.right, data)
    }
  }

  // 前序遍历，递归实现
  preOrder() {
    this.innerPreOrder(this.root)
  }
  innerPreOrder(node) {
    if (node == null) return
    console.log('preOrder的元素是', node.data)
    this.innerPreOrder(node.left)
    this.innerPreOrder(node.right)
  }

  // 中序遍历，递归实现
  inOrder() {
    this.innerInOrder(this.root)
  }
  innerInOrder(node) {
    if (node == null) return
    this.innerInOrder(node.left)
    console.log(node.data)
    this.innerInOrder(node.right)
  }

  // 后序遍历，递归实现
  afterOrder() {
    this.innerAfterOrder(this.root)
  }
  innerAfterOrder(node) {
    if (node == null) return
    this.innerAfterOrder(node.left)
    this.innerAfterOrder(node.right)
    console.log(node.data)
  }

  // preOrder非递归实现: 利用栈 + 循环判断栈非空
  preOrderNR() {
    let stack = []
    stack.push(this.root)
    while (stack.length) {
      const curNode = stack.pop()
      console.log('当前节点是', curNode.data)
      if (curNode.right) {
          stack.push(curNode.right)
      }
      if (curNode.left) {
        stack.push(curNode.left)
      }
    }
  }

  // 层序遍历：队列 + 循环入队
  levelOrder() {
    if (this.root == null) return
    let queue = []
    queue.push(this.root)
    while(queue.length) {
      const current = queue.shift()
      console.log('当前层序遍历的值是', current.data)
      if (current.left) {
        queue.push(current.left)
      }
    if (current.right) {
      queue.push(current.right)
    }
  }
 }

	// 寻找二分搜索树的 最小元素
	getMinValue() {
		if (this.size == 0) {
			throw new Error("BST is empty")
		}
		console.log('最小值是',  this.innerGetMinNode(this.root).data)
  	return this.innerGetMinNode(this.root).data
	 }
	 // 返回以node为根的二分搜索树的 最小值所在的节点
 	innerGetMinNode(node) {
		  if (node.left == null) return node
		 	return this.innerGetMinNode(node.left)
	}
	 
	 // 从二分搜索树中 删除 最小值所在节点, 返回最小值
  removeMinValue(){
    const ret = this.getMinValue()
    this.root = this.innerRemoveMinNode(this.root)
    return ret
	}
	
	// 删除掉 以node为根的二分搜索树中的  最小节点
	// 返回 删除节点后的 新的二分搜索树的根
	innerRemoveMinNode(node){
		if  (node == null) return null
		
		if(node.left == null){
			const rightNode = node.right
      node.right = null
      this.size--
      return rightNode
  	}
  	node.left = this.innerRemoveMinNode(node.left)
  	return node
	}
	
	// 从二分搜索树中 删除元素为data的 节点
	removeNode(data) {
		this.root = this.innerRemoveNode(this.root, data)
	}
	
	// 删除掉以node为根的二分搜索树中值为data的节点, 递归算法
  // 返回删除节点后新的二分搜索树的根
	innerRemoveNode(node, data) {
		if (node == null) return null
		// 情况1  值在左子树范围内
		if (data < node.data) {
    	node.left =  this.innerRemoveNode(node.left, data)
    	return node
 		} else if (data > node.data ){
   		 // 情况2  值在右子树范围内   
    	node.right = this.innerRemoveNode(node.right, data)
    	return node
 		} else {
			// 情况3: 值正好等于当前节点
			// 3.1 待删除节点左子树为空的情况
			if(node.left == null){
			 	const rightNodes = node.right
    		 // 剥落该节点的 右子节点指向 + 返回 右子树内容
     		node.right = null
     		this.size--
     		return rightNodes
		 	}
		 
		 	// 3.2 待删除节点右子树为空的情况
		 	if(node.right == null){
				const leftNodes = node.left
      	node.left = null
      	this.size--
      	return leftNodes
		 	}
		 
			// 3.3: 左右子树都存在: 找到待删除节点的 右子树的最小节点 + 用这个节点顶替待 删除节点的位置
   		const successor = this.innerGetMinNode(node.right)  // 找到这个 后继节点s
   		successor.right = this.innerRemoveMinNode(node.right)  // 该后继节点s 的右子树为 删除了s的 BST树
   		successor.left = node.left   // // 该后继节点s 的左子树为 待删除节点的左子树
   		// 删除了该 待删除节点
   		node.left = node.right = null;
  		// 返回新的 子树
  	 	return successor
 		}
	}

}

let haha= new BST()
haha.addNode(4)
haha.addNode(2)
haha.addNode(6)
haha.addNode(3)

// haha.preOrder()
// haha.inOrder()
// haha.afterOrder()
// haha.levelOrder()     // 4,2,6,3
// console.log('hahaha', haha)

haha.getMinValue()