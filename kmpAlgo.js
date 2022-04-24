// Fungsi computeFail f(k) untuk menghitung size terbesar
// dari prefix P[0..k] yang juga merupakan suffix P[1..k]

function computeFail(pattern) {
  let fail = [];
  fail[0] = 0;

  let m = pattern.length;
  let j = 0;
  let k = 1;

  while (k < m - 1) {
    if (pattern[j] == pattern[k]) {
      fail[k] = j + 1;
      k++;
      j++;
    } else if (j > 0) {
      j = fail[j - 1];
    } else {
      fail[k] = 0;
      k++;
    }
  }
  return fail;
}

console.log(computeFail("ababababca"));

// Fungsi KMP
// return index where pattern start or -1 if not found
function kmpMatch(text, pattern) {
  let n = text.length;
  let m = pattern.length;
  let fail = computeFail(pattern);

  let i = 0;
  let j = 0;
  let count = 0;

  while (i < n) {
    count++;
    if (pattern[j] == text[i]) {
      if (j == m - 1) {
        return i - m + 1; // match
      }
      i++;
      j++;
    } else if (j > 0) {
      j = fail[j - 1];
    } else {
      i++;
    }
  }
  return -1;
}