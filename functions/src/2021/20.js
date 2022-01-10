/* eslint-disable no-loop-func */
const list = document.querySelector('pre').innerText.split('\n');
list.pop();
const printMap = (map) => {
    Object.keys(map)
        .map((key) => parseInt(key))
        .sort((a, b) => a - b)
        .forEach((y) => {
            let str = '';
            Object.keys(map[y])
                .map((x) => parseInt(x))
                .sort((a, b) => a - b)
                .forEach((x) => {
                    str += map[y][x];
                });
            console.log(str);
        });
};
const algo = list.shift();
const map = {};

for (let y = 1; y < list.length; y++) {
    const line = list[y].split('');
    if (map[`${y - 1}`] === undefined) map[`${y - 1}`] = {};
    for (let x = 0; x < line.length; x++) map[`${y - 1}`][`${x}`] = line[x];
}

const doStep = (step) => {
    count = 0;
    const ref = JSON.parse(JSON.stringify(map));
    const maxY = Math.max(...Object.keys(map).map((key) => parseInt(key))) + 1;
    const minY = Math.min(...Object.keys(map).map((key) => parseInt(key))) - 1;
    const maxX = Math.max(...Object.keys(map[0]).map((key) => parseInt(key))) + 1;
    const minX = Math.min(...Object.keys(map[0]).map((key) => parseInt(key))) - 1;
    const outer = step % 2 === 0 ? 0 : 1;
    for (let y = minY; y <= maxY; y++) {
        if (map[y] === undefined) {
            map[y] = {};
        }
        if (ref[y] === undefined) {
            ref[y] = {};
        }
        if (ref[y - 1] === undefined) {
            ref[y - 1] = {};
        }
        if (ref[y + 1] === undefined) {
            ref[y + 1] = {};
        }
        for (let x = minX; x <= maxX; x++) {
            const index = `${ref[`${y - 1}`][`${x - 1}`] ?? outer}${ref[`${y - 1}`][`${x}`] ?? outer}${ref[`${y - 1}`][`${x + 1}`] ?? outer}${ref[`${y}`][`${x - 1}`] ?? outer}${ref[`${y}`][`${x}`] ?? outer}${
                ref[`${y}`][`${x + 1}`] ?? outer
            }${ref[`${y + 1}`][`${x - 1}`] ?? outer}${ref[`${y + 1}`][`${x}`] ?? outer}${ref[`${y + 1}`][`${x + 1}`] ?? outer}`
                .replace(/[#]/g, '1')
                .replace(/[.]/g, '0');
            map[`${y}`][`${x}`] = algo[parseInt(index, 2)];
            if (algo[parseInt(index, 2)] === '#') count++;
        }
    }
};

let steps = 2;
let count = 0;
for (let step = 0; step < steps; step++) {
    doStep(step);
}

console.log(count);
steps = 50;
for (let step = 2; step < steps; step++) {
    doStep(step);
}

console.log(count);
