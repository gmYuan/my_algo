"use strict";

// 实现1.1- 二分查找: 递归实现
function binarySearch1(arr, target) {
  return innerSearch(arr, target, 0, arr.length - 1);
}

function innerSearch(arr, target, l, r) {
  if (l > r) return -1;
  var mid = l + (r - l >> 1);
  var cur = arr[mid];
  if (cur === target) return mid;

  if (cur < target) {
    return innerSearch(arr, target, mid + 1, r);
  } else {
    return innerSearch(arr, target, l, mid - 1);
  }
} // 实现1.2- 二分查找: 非递归实现


function binarySearch2(arr, target) {
  var l = 0,
      r = arr.length - 1; // 易错点1: 递归实现会经过处理，让l不会===r; 这里之前没有处理逻辑，所以需要处理l===r的情况

  while (l <= r) {
    var mid = l + (r - l >> 1);
    var cur = arr[mid];
    if (cur === target) return mid;

    if (cur < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return -1;
} // todo 需要进一步了解
// 相关问题1: 在有序数组中查找 >=target的 最小值索引，如果没有>=target的 就返回-1


function upper(arr, target) {
  var l = 0,
      r = arr.length; // 易错点1: 这里r取arr.length && l < r, 
  // 是因为 r取arr.length-1 && l <=r 时，会出现 l === r === arr.length-1的死循环情况

  while (l < r) {
    var mid = l + (r - l >> 1);
    var cur = arr[mid];

    if (cur < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  } // l>= arr.length时，说明此时所有成员都<target，所以返回特殊处理下返回-1


  return l >= arr.length ? -1 : l;
} // 相关问题2: 在有序数组中查找 <target的 最大值索引，如果没有<target的 就返回-1


function lower(arr, target) {
  var l = -1,
      r = arr.length - 1;

  while (l < r) {
    console.log('aaa', l, r);
    var mid = l + (r - l + 1 >> 1);

    if (arr[mid] < target) {
      l = mid;
    } else {
      // 易错点1: 此时cur>=x，因为要找<target的最大idx，所以砍掉所有 >=target的部分
      r = mid - 1;
    }
  }

  return l;
}

var temp = [1, 2, 3, 4, 4, 6];
var res = lower(temp, 5);
console.log("resaa", res);