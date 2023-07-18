

class MyStack {
	queue: number[]
  constructor() {
		this.queue = []
	}

	/** 目标: 1,2,3 ==> 3,2,1
		  步骤:  preN     queue
			 S1     0        1
			 S2     1       2, 1
			 S3     2       3, 2,1
	*/
  push(x: number): void {
		let preN = this.queue.length
		// 加入新元素后，preN此时正好指向最后一个成员
		this.queue.push(x)
		while (preN) {
			this.queue.push(this.queue.shift())
			preN--
		}
	}

  pop(): number {
		return this.queue.shift()
	}

  top(): number {
		return this.queue[0]
	}

  empty(): boolean {
		return this.queue.length === 0
	}
}
