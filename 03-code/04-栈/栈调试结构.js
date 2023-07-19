class MinStack {
	stack: number[]
	min: number
  constructor() {
		this.stack = []
		this.min = -1
	}

  push(val: number): void {
		if (!this.stack.length) {
			this.min = val
		}
		if (val < this.min) {
			this.stack.push(this.min)
			this.stack.push(val)
		}
	}

  pop(): void {
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
