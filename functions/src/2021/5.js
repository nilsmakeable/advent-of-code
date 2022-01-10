const list = document.querySelector('pre').innerText.split('\n');
list.pop();
let map = [];
let acc = 0;
list.forEach((line) => {
    const parts = line.split(' -> ');
    const part1 = parts[0].split(',');
    const part2 = parts[1].split(',');
    const x1 = parseInt(part1[0]) > parseInt(part2[0]) ? parseInt(part2[0]) : parseInt(part1[0]);
    const x2 = parseInt(part1[0]) > parseInt(part2[0]) ? parseInt(part1[0]) : parseInt(part2[0]);
    const y1 = parseInt(part1[1]) > parseInt(part2[1]) ? parseInt(part2[1]) : parseInt(part1[1]);
    const y2 = parseInt(part1[1]) > parseInt(part2[1]) ? parseInt(part1[1]) : parseInt(part2[1]);
    if (x1 === x2 || y1 === y2) {
        for (let y = y1; y <= y2; y++) {
            if (map[y] === undefined) map[y] = [];
            for (let x = x1; x <= x2; x++) {
                if (map[y][x] === undefined) map[y][x] = 0;
                map[y][x]++;
                if (map[y][x] === 2) acc++;
            }
        }
    }
});

console.log(`first number: ${acc}`);

map = [];
acc = 0;
list.forEach((line) => {
    const parts = line.split(' -> ');
    const part1 = parts[0].split(',');
    const part2 = parts[1].split(',');
    const x1 = parseInt(part1[0]);
    const x2 = parseInt(part2[0]);
    const y1 = parseInt(part1[1]);
    const y2 = parseInt(part2[1]);

    const diff = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    let x = 0;
    let y = 0;
    for (let i = 0; i <= diff; i++) {
        if (x1 === x2) x = x1;
        else x = x1 < x2 ? x1 + i : x1 - i;
        if (y1 === y2) y = y1;
        else y = y1 < y2 ? y1 + i : y1 - i;
        if (map[y] === undefined) map[y] = [];
        if (map[y][x] === undefined) map[y][x] = 0;
        map[y][x]++;
        if (map[y][x] === 2) acc++;
    }
});

console.log(`secound number: ${acc}`);
