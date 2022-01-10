let p1 = 9;
let p2 = 4;
let p1Score = 0;
let p2Score = 0;
let dice = 0;
let rolls = 0;
const nextDice = () => {
    rolls++;
    let val = 0;
    for (let i = 0; i < 3; i++) {
        dice++;
        if (dice > 100) dice = 1;
        val += dice;
    }
    return val;
};
let turn = 0;
while (p1Score < 1000 && p2Score < 1000) {
    if (turn === 0) {
        p1 += nextDice();
        while (p1 > 10) p1 -= 10;
        p1Score += p1;
    } else {
        p2 += nextDice();
        while (p2 > 10) p2 -= 10;
        p2Score += p2;
    }
    turn = (turn + 1) % 2;
    console.log({ p1Score, p2Score });
}

console.log(rolls * 3 * Math.min(p2Score, p1Score));
