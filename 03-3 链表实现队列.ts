// S1 LinkedNode: data + next
// S2 LinkedListQueue: 双指针head + tail (因为队列必然是从一头入队，另一头出队) 和 size
// S3  enqueue入队：queue为空时的特殊处理(赋值tail和head) + 更新tail值 + 更新 size值
// S4  dequeue入队：queue为空时的容错处理 + 更新head值 + 处理最后一个节点出队的特殊情况 + 更新size值

class LinkedNode {
	data: any
  next: any
  constructor(data=null, next=null) {
		this.data = data;
    this.next = next
  }
}



class LinkedListQueue {
	head: any;
  tail: any;
  size: number;
  constructor() {
		this.head = null
    this.tail = null
		this.size = 0
	}
	
	getSize() {
		return this.size
	}
  isEmpty() {
    return this.size === 0
  }

  enqueue(data) {
		if (this.tail == null) {
			this.tail = new LinkedNode(data)
			this.head = this.tail
		} else {
			this.tail.next =  new LinkedNode(data)
			this.tail = this.tail.next
		}
		this.size++
	}
	
	dequeue() {
		if ( this.isEmpty() ) { throw new Error('队列已经为空') }
		let retNode = this.head
		this.head = this.head.next
    // 处理特殊情况: 当前队列只有一个节点且出队后，此时更新后的head为null：更新tail指向，否则tail不会释放已出队节点
		if (this.head == null) {
			this.tail = null
		}

		// 断开出队的 节点连接
		retNode.next = null
		this.size--
		return retNode.data
	}

	getFront() {
		if ( this.isEmpty() ) { throw new Error('队列已经为空') }
		return this.head.data
	}
    
}