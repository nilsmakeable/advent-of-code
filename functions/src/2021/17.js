const x = [70, 96];
const y = [-179, -124];
// const x = [20, 30];
// const y = [-10, -5];

let maxHeight = 0;
let res = 0;
let vy = 1;
let vx = 1;
let curX = 0;
let curY = 0;
let hit = false;
let hits = 0;
for (let i = -200; i <= 200; i++) {
    for (let n = 1; n < 200; n++) {
        vy = i;
        vx = n;
        curX = 0;
        curY = 0;
        maxHeight = 0;
        hit = false;
        for (let step = 0; step < 1000; step++) {
            curY += vy;
            vy--;
            curX += vx;
            if (vx > 0) vx--;
            if (maxHeight < curY) maxHeight = curY;
            if (x > 0) curX--;
            if (curX >= x[0] && curX <= x[1] && curY >= y[0] && curY <= y[1]) {
                if (!hit) hits++;
                hit = true;
            }
        }
        if (hit && res < maxHeight) res = maxHeight;
    }
}
console.log(res);
console.log(hits);
