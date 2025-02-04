function solution(list) {
    let seqStart = -666;
    let seqLength = 0;
  
    const ranges = [];
    const sol = [];
  
    for (let i = 0; i < list.length; i++) {
      if (list[i] === list[i + 1] - 1) {
  
        if (!seqLength) {
          seqStart = list[i];
        }
  
        seqLength++;
      }
      else {
        if (seqLength > 0) {
          ranges.push({from: seqStart, to: seqStart+seqLength});
        }
        else {
          ranges.push({from: list[i], to: list[i]});
        }
        seqLength = 0;
        seqStart = 0;
      }
    }
  
    for (let i = 0; i < ranges.length; i++) {
      let range = ranges[i].to - ranges[i].from;
  
      if (range > 1) {
        sol.push(`${ranges[i].from}-${ranges[i].to}`);
      }
  
      if (range === 1) {
        sol.push(ranges[i].from);
        sol.push(ranges[i].to);
      }
  
      if (range === 0) {
        sol.push(ranges[i].from);
      }
    }
  
    return sol.join(',');
  }