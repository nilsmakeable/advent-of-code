const list = document.querySelector('pre').innerText.split('\n');

let map = { '0_0': 1 };
let H = { x: 0, y: 0 };
let T = { x: 0, y: 0 };

const move = (direction) => {
    const potentialNewT = { x: H.x, y: H.y };
    switch (direction) {
        case 'L':
            H.x -= 1;
            break;
        case 'R':
            H.x += 1;
            break;
        case 'U':
            H.y -= 1;
            break;
        case 'D':
            H.y += 1;
            break;
        default:
    }
    if (Math.abs(T.x - H.x) > 1 || Math.abs(T.y - H.y) > 1) {
        T = potentialNewT;
        map[`${T.x}_${T.y}`] = map[`${T.x}_${T.y}`] ? map[`${T.x}_${T.y}`] + 1 : 1;
    }
};

list.forEach((row) => {
    const dir = row.split(' ')[0];
    const steps = parseInt(row.split(' ')[1]);
    for (let i = 0; i < steps; i += 1) {
        move(dir);
    }
});

console.log(`first answer: ${Object.keys(map).length}`);

map = { '0_0': 1 };
H = { x: 0, y: 0 };
const T1 = { x: 0, y: 0 };
const T2 = { x: 0, y: 0 };
const T3 = { x: 0, y: 0 };
const T4 = { x: 0, y: 0 };
const T5 = { x: 0, y: 0 };
const T6 = { x: 0, y: 0 };
const T7 = { x: 0, y: 0 };
const T8 = { x: 0, y: 0 };
const T9 = { x: 0, y: 0 };

const move2 = (direction) => {
    switch (direction) {
        case 'L':
            H.x -= 1;
            break;
        case 'R':
            H.x += 1;
            break;
        case 'U':
            H.y -= 1;
            break;
        case 'D':
            H.y += 1;
            break;
        default:
    }
    if (Math.abs(T1.x - H.x) > 1 || Math.abs(T1.y - H.y) > 1) {
        if (Math.abs(T1.x - H.x) > 1) T1.x = T1.x > H.x ? T1.x - 1 : T1.x + 1;
        if (Math.abs(T1.y - H.y) > 1) T1.y = T1.y > H.y ? T1.y - 1 : T1.y + 1;
    }
    if (Math.abs(T2.x - T1.x) > 1 || Math.abs(T2.y - T1.y) > 1) {
        if (Math.abs(T2.x - T1.x) > 1) T2.x = T2.x > T1.x ? T2.x - 1 : T2.x + 1;
        if (Math.abs(T2.y - T1.y) > 1) T2.y = T2.y > T1.y ? T2.y - 1 : T2.y + 1;
    }
    if (Math.abs(T3.x - T2.x) > 1 || Math.abs(T3.y - T2.y) > 1) {
        if (Math.abs(T3.x - T2.x) > 1) T3.x = T3.x > T2.x ? T3.x - 1 : T3.x + 1;
        if (Math.abs(T3.y - T2.y) > 1) T3.y = T3.y > T2.y ? T3.y - 1 : T3.y + 1;
    }
    if (Math.abs(T4.x - T3.x) > 1 || Math.abs(T4.y - T3.y) > 1) {
        if (Math.abs(T4.x - T3.x) > 1) T4.x = T4.x > T3.x ? T4.x - 1 : T4.x + 1;
        if (Math.abs(T4.y - T3.y) > 1) T4.y = T4.y > T3.y ? T4.y - 1 : T4.y + 1;
    }
    if (Math.abs(T5.x - T4.x) > 1 || Math.abs(T5.y - T4.y) > 1) {
        if (Math.abs(T5.x - T4.x) > 1) T5.x = T5.x > T4.x ? T5.x - 1 : T5.x + 1;
        if (Math.abs(T5.y - T4.y) > 1) T5.y = T5.y > T4.y ? T5.y - 1 : T5.y + 1;
    }
    if (Math.abs(T6.x - T5.x) > 1 || Math.abs(T6.y - T5.y) > 1) {
        if (Math.abs(T6.x - T5.x) > 1) T6.x = T6.x > T5.x ? T6.x - 1 : T6.x + 1;
        if (Math.abs(T6.y - T5.y) > 1) T6.y = T6.y > T5.y ? T6.y - 1 : T6.y + 1;
    }
    if (Math.abs(T7.x - T6.x) > 1 || Math.abs(T7.y - T6.y) > 1) {
        if (Math.abs(T7.x - T6.x) > 1) T7.x = T7.x > T6.x ? T7.x - 1 : T7.x + 1;
        if (Math.abs(T7.y - T6.y) > 1) T7.y = T7.y > T6.y ? T7.y - 1 : T7.y + 1;
    }
    if (Math.abs(T8.x - T7.x) > 1 || Math.abs(T8.y - T7.y) > 1) {
        if (Math.abs(T8.x - T7.x) > 1) T8.x = T8.x > T7.x ? T8.x - 1 : T8.x + 1;
        if (Math.abs(T8.y - T7.y) > 1) T8.y = T8.y > T7.y ? T8.y - 1 : T8.y + 1;
    }
    if (Math.abs(T9.x - T8.x) > 1 || Math.abs(T9.y - T8.y) > 1) {
        if (Math.abs(T9.x - T8.x) > 1) T9.x = T9.x > T8.x ? T9.x - 1 : T9.x + 1;
        if (Math.abs(T9.y - T8.y) > 1) T9.y = T9.y > T8.y ? T9.y - 1 : T9.y + 1;
        map[`${T9.x}_${T9.y}`] = map[`${T9.x}_${T9.y}`] ? map[`${T9.x}_${T9.y}`] + 1 : 1;
    }
};

list.forEach((row) => {
    const dir = row.split(' ')[0];
    const steps = parseInt(row.split(' ')[1]);
    for (let i = 0; i < steps; i += 1) {
        move2(dir);
    }
});
console.log(`secound answer: ${Object.keys(map).length}`);
