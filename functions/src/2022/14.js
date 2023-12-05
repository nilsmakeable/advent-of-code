const list = document.querySelector('pre').innerText.split('\n');

let map = [...Array(1000).keys()].map(() => [...Array(600).keys()].map(() => '.'));
let floor = 0;
list.forEach((line) => {
    const parts = line.split(' -> ');
    let [x, y] = parts[0].split(',').map((val) => parseInt(val));
    for (let i = 1; parts.length > i; i++) {
        const [nx, ny] = parts[i].split(',').map((val) => parseInt(val));
        for (let n = Math.min(y, ny); n <= Math.max(y, ny); n++) {
            for (let m = Math.min(x, nx); m <= Math.max(x, nx); m++) map[n][m] = '#';
            if (n > floor) floor = n;
        }
        [x, y] = [nx, ny];
    }
});

const sand = { y: 0, x: 500 };
let countSand = 1;
while (sand.y < floor) {
    let canMove = true;
    while (canMove && sand.y < floor) {
        if (map[sand.y + 1][sand.x] === '.') sand.y++;
        else if (map[sand.y + 1][sand.x - 1] === '.') {
            sand.y++;
            sand.x--;
        } else if (map[sand.y + 1][sand.x + 1] === '.') {
            sand.y++;
            sand.x++;
        } else {
            canMove = false;
            map[sand.y][sand.x] = 'o';
            sand.y = 0;
            sand.x = 500;
            countSand++;
        }
    }
}
console.log(`first answer: ${countSand - 1}`);

map = [...Array(1000).keys()].map(() => [...Array(10000).keys()].map(() => '.'));
floor = 0;
list.forEach((line) => {
    const parts = line.split(' -> ');
    let [x, y] = parts[0].split(',').map((val) => parseInt(val));
    for (let i = 1; parts.length > i; i++) {
        const [nx, ny] = parts[i].split(',').map((val) => parseInt(val));
        for (let n = Math.min(y, ny); n <= Math.max(y, ny); n++) {
            for (let m = Math.min(x, nx); m <= Math.max(x, nx); m++) map[n][m] = '#';
            if (n > floor) floor = n;
        }
        [x, y] = [nx, ny];
    }
});

floor += 2;
Object.keys(map[floor]).forEach((x) => {
    map[floor][x] = '#';
});
// Object.values(map).map((val, index) => console.log(`${val.slice(400, 600).join('')} - ${index}`));
sand.y = 0;
sand.x = 500;
countSand = 1;
while (sand.y < floor) {
    let canMove = true;
    while (canMove && sand.y < floor) {
        if (map[sand.y + 1][sand.x] === '.') sand.y++;
        else if (map[sand.y + 1][sand.x - 1] === '.') {
            sand.y++;
            sand.x--;
        } else if (map[sand.y + 1][sand.x + 1] === '.') {
            sand.y++;
            sand.x++;
        } else {
            canMove = false;
            map[sand.y][sand.x] = 'o';
            if (sand.y === 0 && sand.x === 500) {
                floor = 0;
            } else {
                sand.y = 0;
                sand.x = 500;
                countSand++;
            }
        }
    }
}
console.log(`secound answer: ${countSand}`);
