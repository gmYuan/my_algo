import { myArray } from "./01-array";

interface IMyStack<T> {
  getSize(): number;
  isEmpty(): boolean;
  push(e: T): void;
  pop(): T;
  peek(): T;
}

class myStack<E> implements IMyStack<E> {
  arrayStack: myArray<E>
  constructor() {
    this.arrayStack = new myArray();
  }

  getSize() {
    return this.arrayStack.getsize();
  }

  isEmpty() {
    return this.arrayStack.isEmpty();
  }

	getCapacity() {
		return this.arrayStack.getCapacity()
	}

  push<T>(item: T) {
		this.arrayStack.addLast(item)
  }

	pop() {
		return this.arrayStack.removeLast()
	}

	peek() {
		return this.arrayStack.getLast()
	}

 
}

// 测试用例
let test = new myStack()
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
