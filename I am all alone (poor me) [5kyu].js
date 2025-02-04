function allAlone(map) {
    const checked = [];
    const toCheck = new Array();

    let xPos = {};

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 'X') {
                xPos = { x, y };
                break;
            }
        }
    }
    const offsets = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 }
    ];
  
  toCheck.push(structuredClone(xPos));

    function checkSingleCell(cellCheck) {
        for (let i = 0; i < offsets.length; i++) {
            currentSearchingCell = structuredClone(cellCheck);
            currentSearchingCell.x += offsets[i].x;
            currentSearchingCell.y += offsets[i].y;

            let [x, y] = [currentSearchingCell.x, currentSearchingCell.y];

            if (checked.includes(JSON.stringify(currentSearchingCell))) {
                continue;
            };
            if (map[y][x] === 'o') {
                return false;
            }
            if (map[y][x] === ' ') {
                toCheck.push(currentSearchingCell);
            }

            checked.push(JSON.stringify(currentSearchingCell));
        }

        return true;
    }
    let a = 0;
    while (a < toCheck.length) {
        const res = checkSingleCell(toCheck[a]);
        a++;
        if (!res) {
            return false;
        }
    }
    return true;
}