const steal = (res, cap) => {
  const resCount = res.reduce((prev, cur) => prev + cur);
  const percent = cap * 100 / resCount;
  let result;
  let resultCount = 0;

  if(resCount > cap) {
    result = res.map(item => Math.ceil(item * percent / 100));
  } else {
    result = res;
  }

  resultCount = result.reduce((prev, cur) => prev + cur)

  if(resultCount > cap) {
    result.forEach((item, index) => {
      if(resultCount != cap) {
        resultCount -= 1;
        result[index] = item - 1;
        return
      }
    });
  }

  return result;
}

document.getElementById('result').innerHTML = steal([123, 541, 859], 120);