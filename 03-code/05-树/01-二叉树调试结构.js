class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class arrTobinaryTree {
  constructor(arr) {
    // 构建和原数组相同的树节点列表
    const treeNodeList = arr.length > 0 ? [] : null;

    // 把输入数值数组，先转化为二叉树节点列表
    for (let i = 0; i < arr.length; i++) {
      let node = null;
      if (arr[i] !== null) {
        node = new TreeNode(arr[i]);
      }
      treeNodeList.push(node);
      if (i == 0) {
        this.root = node;
      }
    }
    // 遍历一遍，根据规则左右孩子赋值就可以了
    for (let i = 0; i * 2 + 1 < arr.length; i++) {
      const node = treeNodeList[i];
      if (node) {
        // 线性存储转连式存储关键逻辑
        node.left = treeNodeList[2 * i + 1];
        //  再次判断下 不忽略任何一个节点
        if (i * 2 + 2 < arr.length) node.right = treeNodeList[2 * i + 2];
      }
    }
    return this.root;
  }
}

const arr = [3, 9, 20, null, null, 15, 7];
const root = new arrTobinaryTree(arr);
console.log("dd", root);


// 实现参考文档：https://programmercarl.com/%E5%89%8D%E5%BA%8F/ACM%E6%A8%A1%E5%BC%8F%E5%A6%82%E4%BD%95%E6%9E%84%E5%BB%BA%E4%BA%8C%E5%8F%89%E6%A0%91.html#java