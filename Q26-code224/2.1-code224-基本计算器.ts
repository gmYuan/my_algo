/**
code224-基本计算器

给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。


示例 1：
输入：s = "1 + 1"
输出：2


示例 2：
输入：s = " 2-1 + 2 "
输出：3

示例 3：
输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23

*/

/**
双栈设计：
  - 数字栈：存储所有数字
  - 操作符栈：存储运算符和括号

核心思想：
  - 遇到数字直接入栈
  - 遇到运算符时，比较优先级，决定是否计算
  - 遇到括号时特殊处理
  - 保持较高优先级的运算符先计算

优先级处理：
  - 括号具有最高优先级
  - 乘除 > 加减
  - 同级运算符从左到右计算



统一处理负数
  - 将负数统一转换为减法运算
  - -n 转换为 0-n

*/

export {};

function calculate(s: string): number {
  const nums = [0], opes = [];
  const opePriority = { "+": 1, "-": 1, "*": 2, "/": 2 };
  let lastChar = "";
  s = s.replace(/\s/g, "");
  for (const char of s) {
    if (char === "(") {
      opes.push(char);
    } else if (/\d/.test(char)) {
      if (/\d/.test(lastChar)) {
        // 修改最后一个元素
        nums[nums.length - 1] = nums[nums.length - 1] * 10 + +char;
      } else {
        // 添加新元素
        nums.push(+char);
      }
    } else if (char === ")") {
      while (opes.at(-1) !== "(") getCal(nums, opes);
      opes.pop();
    } else {
      if (["(", "+", "-"].includes(lastChar)) nums.push(0);
      while ((opePriority[opes.at(-1)] ?? -1) >= opePriority[char])
        getCal(nums, opes);
      opes.push(char);
    }
    lastChar = char;
  }
  while (opes.length) getCal(nums, opes);
  return nums.at(-1);
}

function getCal(nums, opes) {
  const [v2, v1] = [nums.pop(), nums.pop()];
  const oper = opes.pop();
  const fnMap = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => ~~(a / b),
  };
  const fn = fnMap[oper];
  nums.push(fn(v1, v2));
}
