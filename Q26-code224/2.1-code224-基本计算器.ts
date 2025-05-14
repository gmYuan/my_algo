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

class Solution {
  // 定义运算符优先级映射表
  private opPriority: Map<string, number> = new Map([
    ["-", 1], // 加减法优先级最低，为1
    ["+", 1],
    ["*", 2], // 乘除法优先级中等，为2
    ["/", 2],
    ["%", 2], // 取模优先级同乘除
    ["^", 3], // 幂运算优先级最高，为3
  ]);

  calculate(s: string): number {
    // 去除字符串中所有空格，简化后续处理
    s = s.replace(/\s/g, "");

    // 初始化双栈
    const nums: number[] = [0]; // 数字栈，初始放入0用于处理第一个数为负数的情况
    const ops: string[] = []; // 运算符栈

    // 遍历字符串的每个字符
    for (let i = 0; i < s.length; i++) {
      const c = s[i]; // 当前字符

      if (c === "(") {
        // 如果是左括号，直接入运算符栈
        ops.push(c);
      } else if (c === ")") {
        // 如果是右括号，不断计算直到遇到最近的左括号
        while (ops.length && ops[ops.length - 1] !== "(") {
          this.calc(nums, ops); // 进行计算
        }
        ops.pop(); // 弹出左括号，因为已经计算完这对括号内的内容
      } else if (this.isNumber(c)) {
        // 如果是数字，需要处理多位数的情况
        let num = 0; // 用于存储完整的数字
        let j = i; // 用于向后遍历的指针

        // 循环读取连续的数字字符
        while (j < s.length && this.isNumber(s[j])) {
          num = num * 10 + parseInt(s[j]); // 构建完整数字
          j++;
        }
        nums.push(num); // 将完整数字压入数字栈
        i = j - 1; // 更新主循环的索引
      } else {
        // 处理运算符的情况

        // 处理负数：如果运算符前是左括号或加减号，说明这可能是个负数
        if (
          i > 0 &&
          (s[i - 1] === "(" || s[i - 1] === "+" || s[i - 1] === "-")
        ) {
          nums.push(0); // 压入0，将 -n 转化为 0-n
        }

        // 比较运算符优先级，将可以计算的先计算
        while (ops.length && ops[ops.length - 1] !== "(") {
          const prevOp = ops[ops.length - 1]; // 获取栈顶运算符
          // 如果栈顶运算符优先级大于等于当前运算符，就进行计算
          if (this.opPriority.get(prevOp)! >= this.opPriority.get(c)!) {
            this.calc(nums, ops);
          } else {
            break; // 否则退出循环
          }
        }
        ops.push(c); // 将当前运算符入栈
      }
    }

    // 处理剩余的运算符
    while (ops.length) {
      this.calc(nums, ops);
    }

    // 返回最终结果（数字栈的栈顶元素）
    return nums[nums.length - 1];
  }

  // 计算函数：取出两个数和一个运算符进行计算
  private calc(nums: number[], ops: string[]): void {
    // 如果数字不够两个或没有运算符，直接返回
    if (nums.length < 2 || !ops.length) return;

    // 弹出两个数和一个运算符
    const b = nums.pop()!; // 第二个操作数
    const a = nums.pop()!; // 第一个操作数
    const op = ops.pop()!; // 运算符

    // 进行相应的运算
    let result = 0;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = Math.trunc(a / b);
        break; // 使用Math.trunc确保除法向0取整
      case "^":
        result = Math.pow(a, b);
        break;
      case "%":
        result = a % b;
        break;
    }

    // 将计算结果压回数字栈
    nums.push(result);
  }

  // 判断字符是否为数字的辅助函数
  private isNumber(c: string): boolean {
    return /^\d$/.test(c); // 使用正则表达式判断是否为数字
  }
}

function calculate(s: string): number {
  const nums = [0]; // 初始值用于处理表达式开头的负数
  const ops = [];
  const priority = { "+": 1, "-": 1, "*": 2, "/": 2 };

  let lastChar = "";

  for (const c of s.replace(/\s/g, "")) {
    if (c === "(") {
      ops.push(c);
    } else if (c === ")") {
      while (ops.at(-1) !== "(") calc();
      ops.pop();
    } else if (/\d/.test(c)) {
      nums[nums.length - 1] = nums.at(-1)! * 10 + +c;
    } else {
      if (["+", "-", "("].includes(lastChar)) nums.push(0);

      while (
        ops.length &&
        ops.at(-1) !== "(" &&
        priority[ops.at(-1)!] >= priority[c]
      ) {
        calc();
      }
      ops.push(c);
    }
    lastChar = c;
  }

  while (ops.length) calc();
  return nums[0];

  function calc() {
    const [b, a] = [nums.pop()!, nums.pop()!];
    const op = ops.pop()!;
    const fnMap = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => Math.trunc(a / b),
    };
    const fn = fnMap[op];
    nums.push(fn(a, b));
  }
}
