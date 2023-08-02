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


// 功能代码
function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = [], stack = [ {action: 'go', node: root}]
  while (stack.length) {
    const { action, node } = stack.pop()
    if (!node) continue;
    if (action === 'print') {
      res.push(node.val)
    } else {
      stack.push( { action: 'print', node: node})
      stack.push( { action: 'go', node: node.right})
      stack.push( { action: 'go', node: node.left})
    }
  }
  return res
};


const bTree = listToTree([1, null, 2, 3], 0);
console.log('rr', preorderTraversal(bTree))
