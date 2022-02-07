const data = document.querySelector('pre').innerText.split('\n');
const departtime = parseInt(data[0]);
let bestBus = '';
let minWait = 9999999999;

data[1].split(',').forEach((bus) => {
    if (bus !== 'x' && minWait > parseInt(bus) - (departtime % parseInt(bus))) {
        minWait = parseInt(bus) - (departtime % parseInt(bus));
        bestBus = bus;
    }
});
console.log(bestBus * minWait);

// chinese-remainder-theorem
let offset = 0;
const offsets = [];
let maxBus = 0;
let maxBusOffset = 0;
data[1].split(',').forEach((bus) => {
    if (bus !== 'x') {
        offsets[offset] = parseInt(bus);
        if (maxBus < parseInt(bus)) {
            maxBus = parseInt(bus);
            maxBusOffset = offset;
        }
    }

    offset++;
});
console.log({ offsets, maxBus, maxBusOffset });

const modularMultiplicativeInverse = (a, modulus) => {
    // Calculate current value of a mod modulus
    const b = BigInt(a % modulus);

    // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
    for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
        if ((b * hipothesis) % modulus === 1n) return hipothesis;
    }
    // If we do not find it, we return 1
    return 1n;
};
const solveCRT = (remainders, modules) => {
    // Multiply all the modulus
    const prod = modules.reduce((acc, val) => acc * val, 1n);

    return (
        modules.reduce((sum, mod, index) => {
            // Find the modular multiplicative inverse and calculate the sum
            // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus)
            const p = prod / mod;
            return sum + remainders[index] * modularMultiplicativeInverse(p, mod) * p;
        }, 0n) % prod
    );
};

console.log(
    solveCRT(
        Object.keys(offsets).map((x) => BigInt(parseInt(offsets[x]) - parseInt(x))),
        Object.keys(offsets).map((x) => {
            return BigInt(parseInt(offsets[x]));
        })
    ).toString()
);
