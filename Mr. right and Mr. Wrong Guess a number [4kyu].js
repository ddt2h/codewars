const con_even = (iter) => { return iter % 2 === 0; }
const con_odd = (iter) => { return iter % 2 !== 0; }
const con_div_by = (iter, by) => { return iter % by === 0; }
const con_more_than = (iter, than) => { return iter > than; };
const con_less_than = (iter, than) => { return iter < than; };
const con_start_with = (iter, wh) => { const s = String(iter); return s[0] === String(wh) };
const con_end_with = (iter, wh) => { const s = String(iter); return s[s.length - 1] === String(wh) };

const pattern_seek = (str, wh) => {
    let seek_str = '';
    for (let i = 0; i < str.length; i++) {
        seek_str += str[i];

        switch (seek_str) {
            case 'The number is an even number' : {
                return con_even(wh);
            }
            case 'The number is an odd number' : {
                return con_odd(wh);
            }
            case 'The number is divisible by ' : {
                return con_div_by(wh, Number(str.slice(i), str.length));
            }
            case 'The number is more than ' : {
                return con_more_than(wh, Number(str.slice(i), str.length));
            }
            case 'The number is less than ' : {
                return con_less_than(wh, Number(str.slice(i), str.length));
            }
            case 'The number is starting with ' : {
                return con_start_with(wh, Number(str.slice(i), str.length));
            }
            case 'The number is ending with ' : {
                return con_end_with(wh, Number(str.slice(i), str.length));
            }
        }

    }

    return seek_str;
}

const iter_over = (right, wrong) => {
    let search_for = 0;

    const stack = [];
    const lim = 2001;

    while (search_for < lim) {
        let right_counter = 0;

        for (let i = 0; i < right.length; i++) {
            const guess = pattern_seek(right[i], search_for);
            if (guess) right_counter++;
        }
        for (let i = 0; i < wrong.length; i++) {
            const guess = pattern_seek(wrong[i], search_for);
            
            if (!guess) right_counter++;
        }
        if (right_counter === right.length + wrong.length) { stack.push(search_for); }

        if (stack.length > 1) return null;

        search_for++;
    }

    return stack[0] ?? null;
}

function guessNumber(right, wrong){
    return iter_over(right, wrong);
}