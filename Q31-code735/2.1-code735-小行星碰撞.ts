/**
 * 
735. 小行星碰撞

给定一个整数数组 asteroids，表示在同一行的小行星。数组中小行星的索引表示它们在空间中的相对位置。

对于数组中的每一个元素，
其绝对值表示小行星的大小，
正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。每一颗小行星以相同的速度移动。
找出碰撞后剩下的所有小行星。

碰撞规则：
两个小行星相互碰撞，较小的小行星会爆炸。
如果两颗小行星大小相同，则两颗小行星都会爆炸。
两颗移动方向相同的小行星，永远不会发生碰撞。


示例 1：
输入：asteroids = [5,10,-5]
输出：[5,10]
解释：10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。


示例 2：
输入：asteroids = [8,-8]
输出：[]
解释：8 和 -8 碰撞后，两者都发生爆炸。


示例 3：
输入：asteroids = [10,2,-5]
输出：[10]
解释：2 和 -5 发生碰撞后剩下 -5 。10 和 -5 发生碰撞后剩下 10 。

*/

export {};

function asteroidCollision(asteroids: number[]): number[] {
  const st = [];
  for (let aster of asteroids) {
    // 表示当前行星是否还存在
    let alive = true;
    // 只需要考虑 [-x1, +x2, +x2] 和 aster是负数的 这种 +-相对运动情况 即可
    // 因为 --、++、-+(1个向左运动，1个向右运动)这3种情况 是不可能相撞的，不需考虑
    while (alive && aster < 0 && st.length && st.at(-1) > 0) {
      const diff = -aster - st.at(-1);
      if (diff > 0) st.pop();
      if (diff < 0) alive = false;
      if (diff === 0) {
        st.pop();
        alive = false;
      }
    }
    if (alive) st.push(aster);
  }
  return st;
}
