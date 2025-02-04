function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    const limit = Math.sqrt(n);
    for (let i = 5; i <= limit; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}

class Primes {
    static * stream() {
        let i = 2;
        while (true) {
            if (isPrime(i)) {
                yield i;
            }
            i += 1;
        }
       
    }
}