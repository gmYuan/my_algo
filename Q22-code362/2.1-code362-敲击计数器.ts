/**
code362-敲击计数器

题目描述:
设计一个敲击计数器，使它可以统计在过去5分钟内被敲击次数。

每个函数会接收一个时间戳参数（以秒为单位），
你可以假设最早的时间戳从1开始，
且都是按照时间顺序对系统进行调用（即时间戳是单调递增）。

在同一时刻有可能会有多次敲击。



示例:

HitCounter counter = new HitCounter();

// 在时刻 1 敲击一次。
counter.hit(1);

// 在时刻 2 敲击一次。
counter.hit(2);

// 在时刻 3 敲击一次。
counter.hit(3);

// 在时刻4统计 过去5分钟内的敲击次数,  函数返回 3
counter.getHits(4);  // 3


// 在时刻 300 敲击一次。
counter.hit(300);

// 在时刻 300 统计过去 5 分钟内的敲击次数，函数返回 4 。
counter.getHits(300);  // 4


// 在时刻 301 统计过去 5 分钟内的敲击次数，函数返回 3 。
counter.getHits(301);  // 3, 因为1s时敲击的已经不在 此时的5分钟内了

*/

class HitCounter {
  private q: number[]

  constructor() {
    this.q = []
  }

  hit(timestamp: number) {
    this.clearOverTime(timestamp)
    this.q.push(timestamp)
  }

  getHits(timestamp: number) {
    this.clearOverTime(timestamp)
    return this.q.length
  }

  // 移除超过5分钟的 过期敲击数据
  clearOverTime(timestamp: number) {
    while (this.q.length && timestamp - this.q[0] >= 300) {
      this.q.shift()
    }
  }

}



