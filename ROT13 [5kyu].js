const d = "abcdefghijklmnopqrstuvwxyz";
const rot13 = str => [...str].map(v => {
  const i = d.indexOf(v.toLowerCase());
  if (i === -1) return v;
  const n = (i + 13) % 26;
  return v === v.toUpperCase() ? d[n].toUpperCase() : d[n];
}).join('');