/**

code1429- 第一个唯一数字
 
题目描述:

给定一系列整数，插入一个队列中，找出队列中第一个唯一整数。

实现 FirstUnique 类：
* FirstUnique(int[] nums)  用数组里的数字初始化队列。
* int showFirstUnique()    返回队列中的 第一个唯一 整数的值。如果没有唯一整数，返回 -1。（译者注：此方法不移除队列中的任何元素）
* void add(int value)      将 value 插入队列中。
 

示例 1：
输入：
["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
[[[2,3,5]],[],[5],[],[2],[],[3],[]]

输出：
[null,2,null,2,null,3,null,-1]

解释：
FirstUnique firstUnique = new FirstUnique([2,3,5]);
firstUnique.showFirstUnique(); // 返回 2
firstUnique.add(5);            // 此时队列为 [2,3,5,5]
firstUnique.showFirstUnique(); // 返回 2
firstUnique.add(2);            // 此时队列为 [2,3,5,5,2]
firstUnique.showFirstUnique(); // 返回 3
firstUnique.add(3);            // 此时队列为 [2,3,5,5,2,3]
firstUnique.showFirstUnique(); // 返回 -1


示例 2：
输入：
["FirstUnique","showFirstUnique","add","add","add","add","add","showFirstUnique"]
[[[7,7,7,7,7,7]],[],[7],[3],[3],[7],[17],[]]

输出：
[null,-1,null,null,null,null,null,17]

解释：
FirstUnique firstUnique = new FirstUnique([7,7,7,7,7,7]);
firstUnique.showFirstUnique(); // 返回 -1
firstUnique.add(7);            // 此时队列为 [7,7,7,7,7,7,7]
firstUnique.add(3);            // 此时队列为 [7,7,7,7,7,7,7,3]
firstUnique.add(3);            // 此时队列为 [7,7,7,7,7,7,7,3,3]
firstUnique.add(7);            // 此时队列为 [7,7,7,7,7,7,7,3,3,7]
firstUnique.add(17);           // 此时队列为 [7,7,7,7,7,7,7,3,3,7,17]
firstUnique.showFirstUnique(); // 返回 17


示例 3：
输入：
["FirstUnique","showFirstUnique","add","showFirstUnique"]
[[[809]],[],[809],[]]

输出：
[null,809,null,-1]

解释：
FirstUnique firstUnique = new FirstUnique([809]);
firstUnique.showFirstUnique(); // 返回 809
firstUnique.add(809);          // 此时队列为 [809,809]
firstUnique.showFirstUnique(); // 返回 -1
 
提示：
  1 <= nums.length <= 10^5
  1 <= nums[i] <= 10^8
  1 <= value <= 10^8
  最多调用 5000 次 showFirstUnique 和 add
*/


class FirstUnique {
  private uniqueMap: Map<number, Boolean> = new Map()
  private q: number[] = []
  private qIdx: number = 0
 
  constructor(nums: number[]) {
    for (let val of nums) {
      this.add(val)
    }
  }

  add(value: number): void {
    // 记录当前数字value 是否唯一
    if (!this.uniqueMap.has(value)) {
      this.uniqueMap.set(value, true)
    } else {
      this.uniqueMap.set(value, false)
    }

    // 如果当前数字value 是唯一的，则加入队列
    if (this.uniqueMap.get(value)) {
      this.q.push(value)
    }

    // 把 qIdx 指向 队列中的第一个 唯一数字
    while (this.qIdx < this.q.length && !this.uniqueMap.get(this.q[this.qIdx])) {
      this.qIdx++
    }
  }

  showFirstUnique(): number {
    if (this.qIdx < this.q.length) {
      return this.q[this.qIdx]
    }
    return -1
  }

}

