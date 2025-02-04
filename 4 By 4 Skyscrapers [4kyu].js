const GRID_NUM = 4;

const direction_map = [{x:0,y:0,dx:0,dy:1},{x:1,y:0,dx:0,dy:1},{x:2,y:0,dx:0,dy:1},{x:3,y:0,dx:0,dy:1},{x:3,y:0,dx:-1,dy:0},{x:3,y:1,dx:-1,dy:0},{x:3,y:2,dx:-1,dy:0},{x:3,y:3,dx:-1,dy:0},{x:3,y:3,dx:0,dy:-1},{x:2,y:3,dx:0,dy:-1},{x:1,y:3,dx:0,dy:-1},{x:0,y:3,dx:0,dy:-1},{x:0,y:3,dx:1,dy:0},{x:0,y:2,dx:1,dy:0},{x:0,y:1,dx:1,dy:0},{x:0,y:0,dx:1,dy:0}];

const fetch_direction = (direction_id, grid) => {
    const out = [];

    const d = direction_map[direction_id];

    for (let i = 0; i < GRID_NUM; i++) {
        const x = d.x + (d.dx * i);
        const y = d.y + (d.dy * i);
        const data = grid[y][x];

        out.push({ direction_id, value: data, x, y });
    }

    return out;
}

const how_many_seen = (skyscrapers) => {
    if (skyscrapers.length === 0) return 0;

    let count = 1;
    let tallestSoFar = skyscrapers[0];

    for (let i = 1; i < skyscrapers.length; i++) {
        if (skyscrapers[i] > tallestSoFar) {
            count++;
            tallestSoFar = skyscrapers[i];
        }
    }

    return count;
}

const is_direction_valid = (skyscrapers) => {
    const set = new Set();
    for (let i = 0; i < skyscrapers.length; i++) {
        if (set.has(skyscrapers[i])) return false;
        set.add(skyscrapers[i])
    }
    return true;
}

const validate_view = (clues_arr, grid) => {
    for (let clue_id = 0; clue_id < clues_arr.length; clue_id++) {
        const direction_obj = fetch_direction(clue_id, grid);

        const skyscrapers = direction_obj.map(e => e.value);

        if (!is_direction_valid(skyscrapers)) return false;

        const can_see_num = clues_arr[clue_id];
        const actual_seen = how_many_seen(skyscrapers);

        if (can_see_num === 0) {
            continue;
        }

        if (can_see_num !== actual_seen) return false;
    }
    return true;
}

const naive_fill = () => {
    const out = [];
    for (let i = 0; i < 4; i++) {
        const numbers = [1, 2, 3, 4];
        const result = [];
    
        while (numbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            result.push(numbers[randomIndex]);
            numbers.splice(randomIndex, 1);
        }
    
        out.push(result);
    }
    return out;
}

function solvePuzzle (clues) {
    while (true) {
        let grid = naive_fill();

        if (validate_view(clues, grid)) {
            return grid;
        }
    }
}