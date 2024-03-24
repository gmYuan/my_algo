// leetcode  401-0-n

function readBinaryWatch(turnedOn) {
  const res = [], bits = new Array(10).fill(false);
  backTrack(bits, 0, turnedOn, res);
  return res;
};

function backTrack(bits, index, turnedNum, res) {
  if (index === 10) {
    let hour = 0;
    for (let i = 0; i < 4; i++) {
      hour = hour * 2 + bits[i];
    }

    let minutes = 0;
    for (let i = 4; i < 10; i++) {
      minutes = minutes * 2 + bits[i];
    }

    if (hour < 12 && minutes < 60) {
      let time = `${hour}:`;
      time += minutes < 10 ? `0${minutes}` : `${minutes}`;
      res.push(time);
    }
    return;
  }

  if (10 - index > turnedNum) backTrack(bits, index + 1, turnedNum, res);
  if (turnedNum) {
    bits[index] = true;
    backTrack(bits, index + 1, turnedNum - 1, res);
    bits[index] = false;
  }
}

const res = readBinaryWatch(1)
console.log('rr', res)



