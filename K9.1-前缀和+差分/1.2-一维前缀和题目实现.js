const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = null;
let m = null;
let list = null;
const query = [];

rl.on("line", (line) => {
  const l = line.split(" ").map((i) => Number(i));
  if (n === null) {
    n = l[0];
    m = l[1];
  } else if (list === null) {
    list = l;
  } else {
    query.push(l);
  }
});

rl.on("close", () => {
  const res = prefixSum(list, query);
  console.log(res);
});

// list是输入数组内容， query为[[ l1,r1], [l2,r2] ]的查询数组
function prefixSum(list, query) {
  let res = "";
  let sum = [0];
  // 易错点: 这里需要 <= list.length 而不是 < list.length
  // 因为i是相对sum开始的，它比list多一个位置(向右偏移一个位置)
  // 而最后求[l,r]的和时，其索引又是相对list的，所以需要 <= list.length
  // 这样才能遍历到 list 的最后一个元素
  for (let i = 1; i <= list.length; i++) {
    sum[i] = sum[i - 1] + list[i - 1];
  }

  for (const [l, r] of query) {
    res += `${sum[r] - sum[l - 1]}\n`;
  }
  // 去除最后一个换行符
  return res.slice(0, -1);
}
