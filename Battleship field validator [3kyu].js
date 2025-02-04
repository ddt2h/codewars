function checkHorizontal(arr, row, col) {
    let total = 1;
  
    let prevPos = { x: col, y: row };
    let direction = { x: 0, y: 0};
  
    for (let l = 1; l < Math.min(arr.length, arr.length - col); l++) {
      if (arr[row][col + l] === 1) {
        arr[row][col + l] = -1;
        total++;
        direction = {x: prevPos.x - (col + l), y: prevPos.y - row};
        if (checkForExistingShip(arr, row, col + l, prevPos, direction)) return -1;
        prevPos = {x: col + l, y: row};
      }
      else {
        break;
      }
    }
  
    return total;
  }
  
  function checkVertical(arr, row, col) {
    let total = 1;
    
    let prevPos = { x: col, y: row };
    let direction = { x: 0, y: 0};
  
    for (let l = 1; l < Math.min(arr.length, arr.length - row); l++) {
      if (arr[row + l][col] === 1) {
        arr[row + l][col] = -1;
        total++;
        direction = {x: prevPos.x - (col), y: prevPos.y - (row + l)};
        if (checkForExistingShip(arr, row + l, col, prevPos, direction)) return -1;
  
       prevPos = {x: col, y: row + l};
      }
      else {
        break;
      }
    }
  
    return total;
  }
  
  function checkForExistingShip(arr, row, col, prevPos, direction) {
    const offsets = [
      { x: -1, y: -1 }, // top-left
      { x: 0, y: -1 }, // top
      { x: 1, y: -1 }, // top-right
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }, // right
      { x: -1, y: 1 }, // bottom-left
      { x: 0, y: 1 }, // bottom
      { x: 1, y: 1 }  // bottom-right
    ];
  
    for (let i = 0; i < offsets.length; i++) {
      if (row + offsets[i].y < 0 || col + offsets[i].x < 0) continue;
  
      if (row + offsets[i].y >= arr.length || col + offsets[i].x >= arr.length[0]) continue;
  
      if (offsets[i].x === direction.x * -1 && offsets[i].y === direction.y * -1) {continue};
  
      if (row + offsets[i].y === prevPos.y && col + offsets[i].x === prevPos.x) continue;
  
      //console.log('Checking: ', row + offsets[i].y, ' ', col + offsets[i].x);
  
      if (arr[row + offsets[i].y][col + offsets[i].x] === 1) {
        console.log('exists on row ', row + offsets[i].y, ' col ', col + offsets[i].x)
        //console.log('prevpos = ', prevPos, ' direction = ', direction, ' row = ', row, ' col = ', col);
        return true;
      }
    }
  
    return false;
  }
  
  function checkFor(arr, row, col) {
    //
    if (arr[row][col] !== 1) {
      return 'no ships';
    }
  
    let horSize = checkHorizontal(arr, row, col);
    let vertSize = checkVertical(arr, row, col);
  
    if (horSize === 1 && vertSize === 1) {
      if (checkForExistingShip(arr, row, col, {x: col, y: row}, {x: 0, y: 0})) return -1;
    }
  
    if (horSize === -1 || vertSize === -1) return -1;
  
    let retObj = {};
  
    horSize > vertSize ? retObj = { x: col, y: row, size: horSize, direction: 'horizontal' } : retObj = { x: col, y: row, size: vertSize, direction: 'vertical' };
  
    if (horSize === vertSize) { retObj = { x: col, y: row, size: 1, direction: 'single' } };
  
    return retObj;
  
  }
  
  function validateBattlefield(arr) {
    const ships = [];
    for (let row = 0; row < arr.length; row++) {
      for (let col = 0; col < arr[row].length; col++) {
        let obj = checkFor(arr, row, col);
        if (obj !== 'no ships') ships.push(obj);
      }
    }
  
    let ships1 = 0, ships2 = 0, ships3 = 0, ships4 = 0;
  
    for (let i = 0; i < ships.length; i++) {
      switch (ships[i].size) {
        case 1: {
          ships1++;
          break;
        }
        case 2: {
          ships2++;
          break;
        }
        case 3: {
          ships3++;
          break;
        }
        case 4: {
          ships4++;
          break;
        }
        default: {
          return false;
        }
      }
    }
    if (ships1 !== 4) return false;
    if (ships2 !== 3) return false;
    if (ships3 !== 2) return false;
    if (ships4 !== 1) return false;
  
    return true;
  }