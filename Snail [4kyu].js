const count_unchecked = (mapped) => {
    return mapped.flat(1).reduce((prev, current) => { if (!current.c) { return prev + 1; } else { return prev; } }, 0);;
}

const snail = (arr) => {
    if (!arr.length || !arr[0].length) return [];
    let mapped = arr.map((e) => { return e.map((e2) => { return { v: e2, c: false } }) });
    let dx = 0;
    let dy = 0;
    let dir_i = 0;
    let x = 0;
    let y = 0;
    const out = [];

    const change_dir = () => {
        switch (dir_i) {
            case 0: { dx = 1; dy = 0; break; }
            case 1: { dx = 0; dy = 1; break; }
            case 2: { dx = -1; dy = 0; break; }
            case 3: { dx = 0; dy = -1; break; }
        }
        dir_i++;

        if (dir_i > 3) dir_i = 0;
    }

    change_dir();

    while (count_unchecked(mapped)) {
        if (mapped[y] === undefined || mapped[y][x] === undefined || mapped[y][x].c === true) {
            x -= dx;
            y -= dy;
            change_dir();
        }
        else {
            out.push(mapped[y][x].v);
            mapped[y][x].c = true;
        }

        x += dx;
        y += dy;

    }
    return out;
}