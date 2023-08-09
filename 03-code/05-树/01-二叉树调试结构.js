

// 功能代码

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
	let queue = [root]
	while (queue.length) {
		let cur = queue.shift()
		let temp = cur.left
		cur.left = cur.right
		cur.right = temp
		if (cur.left) {
			queue.push(cur.left)
		}
		if (cur.right) {
			queue.push(cur.right)
		}
	} 
	return root
};









