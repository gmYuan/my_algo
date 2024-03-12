// code  78-84-y

// 参考地址

const subsets = function (nums) {
  const res = [];
  const n = nums.length;
  for (let state = 0; state < (1 << n); state++) {
    res.push(getPath(nums, state))
  }
  return res;
};

function getPath(arr, state) {
  let path = [], idx = 0
  while (state) {
    if (state & 1) {
      path.push(arr[idx])
    }
    state>>
    idx++
  }
}

const res = subsets([1,2,3])
console.log('rr', res)



/***
 *        [1,2,3]
 * state   0: 000==>   []
 * 
 *         1:(001 & 001, k=0)==> [1]
 *            (000)==> /
 * 
 *         2:(010 & 001, k=0)==> []
 *           (001 & 001, k=1)==> [2]
 *           (000)==> /
 * 
 *         3:(011 & 001, k=0)==> [1]
 *           (001 & 001, k=1)==> [1,2]
 *           (000)==> /
 * 
 *         ......
 * 
 *         7:(111 & 001, k=0)==> [1]
 *           (011 & 001, k=1)==> [1,2]
 *           (001 & 001, k=2)==> [1,2,3]
 *           (000)==> /
 * 
 * 
 * 
 * 
 */