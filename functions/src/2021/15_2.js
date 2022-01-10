const list = document.querySelector('pre').innerText.split('\n');
list.pop();
const map = [];
const processed = {};
const orgMap = [];
for (let y = 0; y < list.length; y++) {
    orgMap[y] = [];
    const line = list[y].split('');
    for (let x = 0; x < line.length; x++) {
        orgMap[y][x] = parseInt(line[x]);
    }
}

for (let n = 0; n < 5; n++) {
    for (let m = 0; m < 5; m++) {
        for (let y = 0; y < orgMap.length; y++) {
            if (map[n * orgMap.length + y] === undefined) map[n * orgMap.length + y] = [];
            for (let x = 0; x < orgMap[0].length; x++) {
                map[n * orgMap.length + y][m * orgMap[0].length + x] = ((orgMap[y][x] + n + m - 1) % 9) + 1;
            }
        }
    }
}
let y = 0;
let x = 0;
processed[`0,0`] = 0;
const queue = {};
while (x !== map[0].length - 1 || y !== map.length - 1) {
    const dist = processed[`${y},${x}`];
    if (y - 1 > 0 && processed[`${y - 1},${x}`] === undefined) {
        processed[`${y - 1},${x}`] = dist + map[y - 1][x];
        queue[`${y - 1},${x}`] = dist + map[y - 1][x];
    }
    if (y + 1 < map.length && processed[`${y + 1},${x}`] === undefined) {
        processed[`${y + 1},${x}`] = dist + map[y + 1][x];
        queue[`${y + 1},${x}`] = dist + map[y + 1][x];
    }
    if (x - 1 > 0 && processed[`${y},${x - 1}`] === undefined) {
        processed[`${y},${x - 1}`] = dist + map[y][x - 1];
        queue[`${y},${x - 1}`] = dist + map[y][x - 1];
    }
    if (x + 1 < map[0].length && processed[`${y},${x + 1}`] === undefined) {
        processed[`${y},${x + 1}`] = dist + map[y][x + 1];
        queue[`${y},${x + 1}`] = dist + map[y][x + 1];
    }
    let minLen = Infinity;
    let next = '';
    // eslint-disable-next-line no-loop-func
    Object.keys(queue).forEach((key) => {
        if (minLen > queue[key]) {
            minLen = queue[key];
            next = key;
        }
    });
    delete queue[next];
    const parts = next.split(',');
    y = parseInt(parts[0]);
    x = parseInt(parts[1]);
}
console.log(processed[`${map.length - 1},${map[0].length - 1}`]);
