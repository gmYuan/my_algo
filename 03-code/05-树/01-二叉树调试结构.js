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
function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let res = []
  let pre = null, cur = root
  while (cur) {
    if (!cur.left) {
      // 左归阶段
      res.push(cur.val)
      cur = cur.right
    } else {
      // 寻找前继节点
      pre = cur.left
      while (pre.right && pre.right !== cur) {
        pre = pre.right
      }
      // 创建连接关系 + 移动到下一层进行创建 
      if (!pre.right) {
        pre.right = cur
        cur = cur.left
      } else {
         // 左归阶段: 断开连接关系 + 回到上一层父节点
        res.push(cur.val)
        pre.right = null
        cur = cur.right
      }
    }
  }
  return res
}








const bTree = listToTree([1, null, 2, 3], 0);
console.log('rr', preorderTraversal(bTree))
