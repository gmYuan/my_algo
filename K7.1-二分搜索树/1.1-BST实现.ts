/**
 * 二分搜索树
 * 功能：实现二分搜索数结构的 增删改查
 *
 **/

export {};

class TNode {
  data: number | undefined;
  left: TNode;
  right: TNode;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  root: TNode | null;
  size: number;
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  // 向二分搜索树中添加元素
  // 因为使用时只会传入data值，所以需要用addNodeImp来内部创建 二分搜索树的节点结构
  addNode(data) {
    this.root = this.addNodeImp(this.root, data);
  }

  // 向 以node为根的二分搜索树中 插入元素
  // 返回插入新节点后 二分搜索树的根
  addNodeImp(node, data) {
    if (node == null) {
      this.size++;
      return new node(data);
    }
    // 当前值小于node节点值，加入为 左孩子节点
    if (data < node.data) {
      node.left = this.addNodeImp(node.left, data);
    } else if (data > node.data) {
      node.right = this.addNodeImp(node.right, data);
    }
    return node;
  }

  // 检测树中是否存在data值
  contains(data) {
    this.containsImp(this.root, data);
  }

  // 检测 以node为根的二分搜索树中 是否存在data值, 递归算法
  containsImp(node, data) {
    if (node == null) return false;
    if (node.data === data) return true;
    if (data < node.data) {
      return this.containsImp(node.left, data);
    } else {
      return this.containsImp(node.right, data);
    }
  }

  // 前序遍历，递归实现: 先处理节点A，再分别处理其左右子节点
  preOrder() {
    this.preOrderImp(this.root);
  }

  preOrderImp(node) {
    if (node == null) return;
    console.log("前序遍历的元素是", node.data);
    this.preOrderImp(node.left);
    this.preOrderImp(node.right);
  }

  // 中序遍历，递归实现: 先处理节点A的左子节点，再处理节点A，最后处理节点A的右子节点
  // 中序遍历的特点: 其输出结果是 从小到大排序的
  inOrder() {
    this.inOrderImp(this.root);
  }

  inOrderImp(node) {
    if (node == null) return;
    this.inOrderImp(node.left);
    console.log("中序遍历的元素是", node.data);
    this.inOrderImp(node.right);
  }

  // 后序遍历，递归实现: 先处理节点A的左子节点，再处理节点A的右子节点，最后处理节点A
  postOrder() {
    this.postOrderImp(this.root);
  }

  postOrderImp(node) {
    if (node == null) return;
    this.postOrderImp(node.left);
    this.postOrderImp(node.right);
    console.log("后序遍历的元素是", node.data);
  }


}


// 实例
const bst = new BST();
const nums = [5, 3, 6, 8, 4, 2];
for (const num of nums) {
  bst.addNode(num);
}
//    5
//   / \
//   3  6
//  / \  \
//  2  4   8

bst.preOrder(); // 5 3 2 4 6 8
