function permutations(str) {
	const results = [];
    if (str.length === 1) {
        return [str];
    }
    const uniqueChars = new Set();
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (uniqueChars.has(char)) continue;
        uniqueChars.add(char);

        const remainingChars = str.slice(0, i) + str.slice(i + 1);
        const remainingPerms = permutations(remainingChars);

        for (let perm of remainingPerms) {
            results.push(char + perm);
        }
    }
    return results;
}