function measureTiming(login, prefix, candidates, rounds = 3) {
    return candidates.map(char => {
        let totalTime = 0;
        for (let r = 0; r < rounds; r++) {
            let attempt = prefix + char;
            let start = process.hrtime();
            if (login(attempt)) return [char, Number.MAX_SAFE_INTEGER];
            let elapsed = process.hrtime(start);
            totalTime += elapsed[1];
        }
        return [char, totalTime];
    });
}

function filterTopCandidates(timings) {
    return timings
        .sort((a, b) => b[1] - a[1])
        .slice(0, Math.ceil(timings.length / 2))
        .map(e => e[0]);
}

function crack(login) {
    let pw = '';
    const charset = '0123456789';

    while (true) {
        let candidates = [...charset];

        while (candidates.length > 1) {
            let timings = measureTiming(login, pw, candidates);
            candidates = filterTopCandidates(timings);
        }

        pw += candidates[0];
        if (login(pw)) return pw;
        if (pw.length > 32) pw = '';
    }
}