// 循环队列: 双指针 + size + 双指针相关时取余循环
// S1 双指针判断 队列是否为空 ==>  font === tail
// S2 为了避免 队列满时 front === tail再次满足（和为空时 一致）==> 浪费1空间法： 开辟一个 多余空间以做区分

// S3 入栈: 已满时扩容 + 存入新元素 + 更新双指针和size
// S4 扩容: 新建数组 + 遍历拷贝(下标偏移量) + 重置front和tail
// S5 出栈: 获取尾元素 & 重置为null + 更新双指针和size + 1/4时缩容

class LoopQueue {
  data: any[];
  front: number
  tail: number
  size: number
  
  // 循环队列： 双指针 + size
  constructor(cap = 10) {
    this.data = new Array(cap + 1)
    this.front = 0
    this.tail = 0
    this.size = 0
  }

  // S1 双指针判断 队列是否为空
  isEmpty() {
    return this.front === this.tail
  }

  // S2 判断是否已满 ==> 浪费1空间法
  isFull() {
    const { front, tail, data } = this
    return (tail + 1) % data.length === front
  }

  // S2 因为多开辟了一个空间，但是对用户而言，应该是黑盒 ==> 期望有10个，实际开了11个，但多余的一个不该暴露展示
  getCapacity() {
    return this.data.length - 1
  }

  getSize() {
    return this.size
  }

  //S3 入栈: 已满时扩容 + 存入数据 + 更新双指针+size
  enqueue(item) {
    let {isFull, resize, getCapacity} = this
    if (isFull) {
      // resize会做浪费1空间处理，所以此处如果传入data.length,就会浪费了2个空间，导致已满判断不正确
      resize(getCapacity() * 2)
    } 

    this.data[this.tail] = item
    this.tail = (this.tail + 1) % this.data.length
    this.size++
  }

  // S5 出栈
  dequeue() {
    if (this.isEmpty())  return;
    
    const res = this.data[this.front]
    this.data[this.front] = null
    this.front = (this.front + 1) % this.data.length
    this.size--

    if (this.size === this.getCapacity() /4  && this.getCapacity()/2 > 0) {
      this.resize(this.getCapacity() / 2)
    }
    return res
  }


  // S4 扩容: 遍历偏移拷贝 + 更新指针
  resize(newCap) {
    let newData = new Array(newCap + 1)
    for (let i = 0; i< this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length]
    }
    this.data = newData
    this.front = 0
    this.tail = this.size
  }
  
  


}