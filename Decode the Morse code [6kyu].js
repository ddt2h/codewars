function removePaddings(str) {
    ret = str.split('');
    while (ret[0] === ' ') {
      ret.shift();
    }
    while (ret[ret.length - 1] === ' ') {
      ret.pop();
    }
    return ret.join('');
  }
  
  function splitByWords(str) {
    let arr = [];
    let prevId = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ' ' && str[i + 1] === ' ' && str[i + 2] === ' ') {
        arr.push(str.slice(prevId, i));
        prevId = i + 3;
        i = i + 3;
      }
    }
    arr.push(str.slice(prevId, str.length));
    return arr;
  }
  
  function splitByLetters(arr) {
    let letters = [];
  
    for (let i = 0; i < arr.length; i++) {
      letters.push(arr[i].split(' '));
    }
  
    return letters;
  }
  
  function constructStr(wordsLetters) {
    let str = '';
    for (let i = 0; i < wordsLetters.length; i++) {
      for (let j = 0; j < wordsLetters[i].length; j++) {
        str += MORSE_CODE[wordsLetters[i][j]]
      }
      if (i !== wordsLetters.length - 1) str += ' '; 
    }
    return str;
  }
  
  decodeMorse = function (morseCode) {
    let removedPads = removePaddings(morseCode);
    let words = splitByWords(removedPads);
    let wordsAndLetters = splitByLetters(words);
    return constructStr(wordsAndLetters);
}