function calculate(s: string): number {
  const opes = [], nums = [0];
  // 隐藏的优选级：()括号 的优先级最高
  const opePriority = { "+": 1, "-": 1, "*": 2, "/": 2 };
  let lastChar = "";
  // 替换掉所有空格
  s = s.replace(/\s/g, "");

  // 遍历字符串
  for (let char of s) {
    // 是左括号
    if (char === "(") {
      opes.push(char);
    } else if (/\d/.test(char)) {
      // 易错点1: 是数字类型的字符串，如果上一个也是数字，那么需要和上一个数字拼接起来
      if (/\d/.test(lastChar)) {
        nums[nums.length - 1] = nums.at(-1) * 10 + +char;
      } else {
        nums.push(+char);
      }
    } else if (char === ")") {
      // 是右括号：优先级最高，说明需要进行运算，直到运行到左括号为止
      while (opes.at(-1) !== "(") getCal(nums, opes);
      // 运算完成后，让左括号出栈
      opes.pop();
    } else {
      // 说明是负号 或者 运算操作符
      // 先处理是负号的情况：前面的一位是 (、+、-
      // 不包含 * 和 /，是因为数学规范里， * 和 / 后面的负数需要用括号包起来，所以这里无需考虑
      if (["(", "+", "-"].includes(lastChar)) nums.push(0);

      // 易错点2: 如果目前操作栈顶的优先级 >= 当前的运算符，那么就需要先进行运算
      // 这里需要注意可能之前有多个运算符优先级都 >= 当前的运算符，所以需要用 while循环
      while ((opePriority[opes.at(-1)] ?? -1) >= opePriority[char]) {
        getCal(nums, opes);
      }

      // 存入当前运算符
      opes.push(char);
    }
    lastChar = char;
  }
  // 易错点4: 当遍历完字符串后，可能栈中还有运算符，此时 需要进行剩余值计算
  while (opes.length) getCal(nums, opes);
  return nums.at(-1);
}

function getCal(nums, opes) {
  const [v2, v1] = [nums.pop(), nums.pop()];
  const ope = opes.pop();
  const fnMap = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => ~~(a / b),
  };
  const fn = fnMap[ope];
  nums.push(fn(v1, v2));
}
