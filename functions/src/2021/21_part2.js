const player1 = 9;
const player2 = 4;

const combinations = [
    [1, 1, 1],
    [1, 1, 2],
    [1, 1, 3],
    [1, 2, 1],
    [1, 2, 2],
    [1, 2, 3],
    [1, 3, 1],
    [1, 3, 2],
    [1, 3, 3],
    [2, 1, 1],
    [2, 1, 2],
    [2, 1, 3],
    [2, 2, 1],
    [2, 2, 2],
    [2, 2, 3],
    [2, 3, 1],
    [2, 3, 2],
    [2, 3, 3],
    [3, 1, 1],
    [3, 1, 2],
    [3, 1, 3],
    [3, 2, 1],
    [3, 2, 2],
    [3, 2, 3],
    [3, 3, 1],
    [3, 3, 2],
    [3, 3, 3],
];

const wins = new Map();

function count(p1, p2, s1, s2) {
    if (s2 >= 21) return [0, 1];
    const key = [p1, p2, s1, s2].join(',');
    const cached = wins.get(key); // cache
    if (cached != null) return cached;

    const res = [0, 0];
    for (const rolls of combinations) {
        let n1 = p1 + rolls[0] + rolls[1] + rolls[2];
        n1 = ((n1 - 1) % 10) + 1;
        const ns1 = s1 + n1;
        const w = count(p2, n1, s2, ns1);
        res[0] += w[1];
        res[1] += w[0];
    }

    wins.set(key, res); // cache
    return res;
}

const cnt = count(player1, player2, 0, 0);
console.log(Math.max(...cnt));
