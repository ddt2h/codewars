function Dictionary(words) {
    this.words = words;
}
Dictionary.prototype.getMatchingWords = function (pattern) {
    return this.words.map((word) => {
        if (word.length > pattern.length) return;
        for (let i = 0; i < pattern.length; i++) {
            if (!word[i]) return;
            if (pattern[i] === '?') continue;
            if (pattern[i] !== word[i]) return;
        }
        return word;
    }).filter((word) => word);
}