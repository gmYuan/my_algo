class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 列表转二叉树
function listToTree(list, index) {
  if (!list || !list.length || !list[index]) return null;
  let root = new TreeNode(list[index]);
  let leftIndex = 2 * index + 1;
  let rightIndex = 2 * index + 2;
  // 创建左子节点
  if (leftIndex > list.length - 1) {
    root.left = null;
  } else {
    root.left = listToTree(list, leftIndex);
  }
  // 创建右子节点
  if (rightIndex > list.length - 1) {
    root.right = null;
  } else {
    root.right = listToTree(list, rightIndex);
  }
  // 返回当前节点
  return root;
}


// 右子树的右子节点

// 功能代码
function rightSideView(root) {
  if (!root) return []
  let queue = [{node: root, depth: 0}], res = []
  while (queue.length) {
    const { node, depth } = queue.shift()
    if (!res[depth]) {
      res[depth] = node.val
    }
    if (node.right) {
      queue.push( {node: node.right, depth: depth + 1})
    }
    if (node.left) {
      queue.push( {node: node.left, depth: depth + 1})
    }
  }
  return res
 
};



const bTree = listToTree([1,2,3,null,5,null,4], 0);

console.log('rr', rightSideView(bTree))
