const str = 'abcdefghijklmnopqrstuvwxyz';

function alphabetPosition(text) {
  const ret = [];
  for (let i = 0; i < text.length; i++) {
    if (str.indexOf(text[i].toLowerCase()) !== -1) ret.push(str.indexOf(text[i].toLowerCase()) + 1);
  }
  return ret.join(' ');
}