// function partition(s) {
//   let cur = [], res = []
//   dfs(s, 0, cur, res)
//   return res
// };

// function dfs(str, curIdx, cur, res) {
//   if (curIdx >= str.length) {
//     res.push(cur)
//     return
//   }
//   for (let i = curIdx; i < str.length; i++) {
//     if (isPalindrome(str, curIdx, i)) {
//       cur.push(str.slice(curIdx, i+1))
//       dfs(str, i+1, cur, res)
//       cur.pop()
//     }
//   }
// }

// function isPalindrome(str, left, right) {
//   while (left <= right) {
//     if (str[left] !== str[right]) return false;
//     left++
//     right-- 
//   }
//   return true
// }


function partition(s) {
  let cur = [], res = []
  dfs(s, 0, cur, res)
  return res
};

function dfs(str, curIdx, cur, res) {
  if (curIdx >= str.length) {
     res.push([...cur])
    return
  }
  for (let i = curIdx; i < str.length; i++) {
    if (isPalindrome(str, curIdx, i)) {
      cur.push(str.slice(curIdx, i + 1))
      dfs(str, i+1, cur, res)
      cur.pop()
    }
  }
}

function isPalindrome(str, left, right) {
  while (left <= right) {
    if (str[left] !== str[right]) return false;
    left++
    right-- 
  }
  return true
}

let s1 = "aab"
let tes = partition(s1)
console.log('dd', tes) 