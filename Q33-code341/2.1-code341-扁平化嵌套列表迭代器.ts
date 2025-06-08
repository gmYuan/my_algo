/**
 * 

给你一个嵌套的整数列表 nestedList 。
每个元素要么是一个整数，要么是一个列表；
该列表的元素也可能是整数或者是其他列表。
请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。

实现扁平迭代器类 NestedIterator ：

NestedIterator(List<NestedInteger> nestedList) 
  - 用嵌套列表 nestedList 初始化迭代器。

int next() 
  - 返回嵌套列表的下一个整数。

boolean hasNext() 
  - 如果仍然存在待迭代的整数，返回 true ；否则，返回 false 。


示例 1：
输入：nestedList = [[1,1],2,[1,1]]
输出：[1,1,2,1,1]
解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。


示例 2：
输入：nestedList = [1,[4,[6]]]
输出：[1,4,6]
解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。

*/

export {};

class NestedIterator {
  st: NestedInteger[];
  constructor(nestedList: NestedInteger[]) {
    this.st = nestedList;
  }

  hasNext(): boolean {
    while (this.st.length) {
      const cur = this.st[0];
      if (cur.isInteger()) return true;
      else {
        this.st.shift();
        this.st.unshift(...cur.getList());
      }
    }
    return false;
  }

  next(): number {
    return this.st.shift().getInteger();
  }
}
