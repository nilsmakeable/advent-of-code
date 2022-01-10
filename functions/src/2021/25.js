const data = document.querySelector('pre').innerText.split('\n');
data.pop();

let map = [];

for (let y = 0; y < data.length; y++) {
    map[y] = [];
    for (let x = 0; x < data[0].length; x++) {
        map[y][x] = data[y][x];
    }
}

let step = 0;
let moves = 1;
while (moves > 0 || step % 2 === 1) {
    if (step % 2 === 0) moves = 0;
    const res = JSON.parse(JSON.stringify(map));
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            if (map[y][x] === '.') {
                if (step % 2 === 1 && map[y > 0 ? y - 1 : map.length - 1][x] === 'v') {
                    moves++;
                    res[y][x] = 'v';
                    res[y > 0 ? y - 1 : res.length - 1][x] = '.';
                }
                if (step % 2 === 0 && map[y][x > 0 ? x - 1 : map[y].length - 1] === '>') {
                    moves++;
                    res[y][x] = '>';
                    res[y][x > 0 ? x - 1 : res[y].length - 1] = '.';
                }
            }
        }
    }
    map = JSON.parse(JSON.stringify(res));
    step++;
}
console.log(step / 2);
