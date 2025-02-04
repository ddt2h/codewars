function nextSmaller(n) {
    let d = String(n).split('').map(Number), l = d.length, i = l - 2;
    while (i >= 0 && d[i] <= d[i + 1]) i--;
    if (i === -1) return -1;
    let j = l - 1;
    while (d[j] >= d[i]) j--;
    [d[i], d[j]] = [d[j], d[i]];
    let r = Number(d.slice(0, i + 1).concat(d.slice(i + 1).sort((a, b) => b - a)).join(''));
    return r.toString().length === String(n).length ? r : -1;
}