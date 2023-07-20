// var NestedIterator = function(nestedList) {
// 	// 通过生成器函数递归遍历嵌套数组
// 	var generator = function * (arr) {
// 			for (var i = 0; i < arr.length; i++) {
// 					if (arr[i].isInteger()) {
// 							yield arr[i].getInteger()
// 					} else {
// 							yield* generator(arr[i].getList())
// 					}
// 			}
// 	};

// 	// 初始化迭代器
// 	this.iterator = generator(nestedList);
// 	// 调用迭代器的 next 方法，返回 {value: val, done: true/false}，value 为返回的值，done 表示是否遍历完
// 	this.nextVal = this.iterator.next();
// };


// /**
// * @this NestedIterator
// * @returns {boolean}
// */
// NestedIterator.prototype.hasNext = function() {
// 	return !this.nextVal.done;
// };

// /**
// * @this NestedIterator
// * @returns {integer}
// */
// NestedIterator.prototype.next = function() {
// 	var value = this.nextVal.value;
// 	// 调用迭代器的 next 方法，更新 nextVal 的值
// 	this.nextVal = this.iterator.next();
// 	return value;
// };



class NestedIterator {
	constructor(nestedList: NestedInteger[]) {
		// 通过生成器函数 递归遍历嵌套数组
		const gen = function *(arr) {
			for (let nest of arr) {
				if (nest.isInteger()) {
					yield nest.getInteger()
				} else {
					yield *gen(nest.getList())
				}
			}
		}
		this.iter = gen(nestedList)
		//调用迭代器的next方法，返回 {value: val, done: true/false}
    this.curInfo = this.iter.next()
  }

  hasNext(): boolean {
		return !this.curInfo.done
  }

  next(): number {
		const ret = this.curInfo.value
		this.curInfo = this.iter.next()
		return ret
  }

}