function isValidIP(str) {
    const arr = str.split('.');
    if (arr.length !== 4) return false;
    for (let i = 0; i < 4; i++) {
      if (!arr[i]) return false;
      if (arr[i][0] === '0' && arr[i].length > 1) return false;
      if (arr[i].length > 1 && isNaN(arr[i][1])) return false;
      if (isNaN(Number(arr[i]))) return false;
      if (arr[i] > 255 || arr[i] < 0) return false;
      if (arr[i].length > Number(arr[i]).toString().length) return false;
    }
    return true;
}