class Stack<T>{
    private stack: T[] = new Array(1)
    private size = 0

    isEmpty() { return this.size === 0 }
    getSize() {return this.size }

    push(item: T) {
        let {size, stack, resize} = this
        if (size === stack.length) { resize(stack.length * 2)  }
        stack[size++] = item
    }

    pop(): T {
        let {size, stack, resize} = this
        if (size > 0) {
            const item = stack[--size]
            stack[size] = null
            if (size === stack.length / 4) {  resize(stack.length / 2) } 
            return item
        }
    }

    private resize(cap: number){
        let temp = new Array(cap)
        for (let i = 0; i < this.stack.length; i++) {
            temp[i] = this.stack[i]
        }
        this.stack = temp
    }

}

// 测试用例
let test = new Stack()
test.push(1)
test.push(2)
test.push(3)
test.push(4)
console.log('test1', test)

test.pop()
console.log('test2', test)
test.pop()
console.log('test3', test)
test.pop()
console.log('test4', test)







