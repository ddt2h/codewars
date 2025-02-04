function createPhoneNumber(numbers){
    let [f, s, t] = [numbers.slice(0, 3), numbers.slice(3, 6), numbers.slice(6, 10)];
    let str = '('+(f.join('')) + ')' +' ' + (s.join('')) + '-' + (t.join(''));
    return str;
}