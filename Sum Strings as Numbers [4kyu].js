function sumStrings(a, b) {
    const vals = [a, b];
      let out = '';
  
      vals[0].length > vals[1].length ? vals[1] = '0'.repeat(vals[0].length - vals[1].length) + vals[1] :
          vals[0] = '0'.repeat(vals[1].length - vals[0].length) + vals[0];
  
      let excess = 0;
  
      for (let i = vals[0].length - 1 ; i >= 0; i--) {
          let currentSum = (+vals[0][i] + +vals[1][i]) + excess;
          excess = 0;
          
          let strSum = String(currentSum);
  
          if (strSum.length > 1) {
  
              if (i === 0) {
                  out = strSum + out;
                  break;
              }
  
              out = strSum[1] + out;
              excess = +strSum[0]; 
              continue;
          }
  
          out = strSum[0] + out;
      }
    for (let i = 0; i < out.length; i++) {
        if (out[i] !== '0') {
          return out.slice(i, out.length)
        }
      }
      
      return out;
}