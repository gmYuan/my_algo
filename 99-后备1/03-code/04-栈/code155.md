# LeetCode155- 最小栈

## 实现思路

1 单栈差值法: 单栈 + diff + min值

2 单栈多存法: 单栈 + 多存一个最小值 + min值

2 参考文档

[01 多种实现方法参考实现](https://leetcode.cn/problems/min-stack/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-38/)


## 代码实现

1 方法1: 单栈差值法 时间复杂度：O(1)  空间复杂度：O(n)

/**
这种解法是不是保证了，数组里的最多只有1个是负数

是的，您观察得非常准确！在单栈差值法中，栈中最多只会有一个负数，而且这个负数只可能出现在栈顶。
这是因为：
只有当 val < min 时，diff = val - min 才会是负数
当我们遇到一个负的diff时，会立即更新 min = val
更新后的min是当前栈中最小的元素
只有当出现比当前min还小的新元素时，才会再次出现负数差值
此时上一个负数差值对应的元素一定还在栈中
简单来说，每当一个新的负数差值入栈时，它就代表了当前的最小值。同时，前一个代表最小值的负数差值会失去"最小值"的地位，但它保存的信息仍然能用于恢复前一个最小值。
这个特性使得算法能够在O(1)时间内找到最小值，也能在弹出栈顶元素时恢复正确的最小值。非常巧妙的设计！

*/

```ts
class MinStack {
  stack: number[]
  min: null | number
  constructor() {
    this.stack = []
		this.min = null
  }

  push(val: number): void {
    // 易错点1：要使用this.stack.length来让min不断初始化
    // 如果使用 this.min === null来判断，会在入栈又出栈为空再入栈值时，min的值还是旧值
    if (!this.stack.length) {
      this.min = val
    }
		const diff = val - this.min
    // 如果当前元素值比当前最小值还要小，就要更新最小值
		if (diff < 0) {
			this.min = val
		}
    // 存入的是差值
		this.stack.push(diff)
  }

  pop(): void {
    let v1 = this.stack.pop()
   // 如果当前出栈值是负数，说明目前出栈的元素 就是最小值，出栈后需要更新min值指向 之前的最小值
    if (v1 < 0) {
      this.min = this.min - v1 
    }
  }

  top(): number {
    let v1 = this.stack[this.stack.length - 1]
		return v1 >= 0 ? v1 + this.min : this.min 
  }

  getMin(): number {
    return this.min
  }
}
```

2 方法2 单栈多存最小值法  时间复杂度：O(1)  空间复杂度：O(n)

```ts
class MinStack {
  stack: number[]
	min: number
  constructor() {
		this.stack = []
		this.min = Number.MAX_VALUE
	}

  push(val: number): void {
    // 易错点1: val等于最小值的时候也要多存一个最小值，因为在下面出栈的时候，相等情况也会出2次
		if (val <= this.min) {
      // 先存之前的最小值，再存当前元素值
			this.stack.push(this.min)
      this.min = val
		}
    this.stack.push(val)
	}

  pop(): void {
    // 如果当前出栈元素就是最小值，需要再出栈1次，把保留的上一次最小值取出来
		if (this.stack.pop() === this.min) {
			this.min = this.stack.pop()
		}
	}

  top(): number {
		return this.stack[this.stack.length - 1]
	}

  getMin(): number {
		return this.min
	}
   
}

```

