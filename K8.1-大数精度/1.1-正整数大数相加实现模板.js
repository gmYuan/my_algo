function addLargeNumber(num1, num2) {
  let num1Arr = String(num1).split("").reverse();
  let num2Arr = String(num2).split("").reverse();
  let res = addImp(num1Arr, num2Arr);
  return res.reverse().join("");
}

function addImp(nums1, nums2) {
  let res = [];
  let carry = 0;
  for (let i = 0; i < nums1.length || i < nums2.length; i++) {
    let curVal = (+nums1[i] || 0) + (+nums2[i] || 0) + carry;
    res.push(curVal % 10);
    carry = Math.floor(curVal / 10);
  }
  if (carry) res.push(carry);
  return res;
}

let ex = addLargeNumber(123, 456);
console.log(ex);
