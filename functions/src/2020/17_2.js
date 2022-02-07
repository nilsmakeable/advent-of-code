const list = document.querySelector('pre').innerText.split('\n');

let map = { 0: { 0: {} } };

for (let y = 0; y < list.length; y++) {
    map[0][0][y] = list[y].split('');
}
const steps = 6;
let acc = 0;
for (let step = 0; step < steps; step++) {
    const res = {};
    acc = 0;
    const ws = Object.keys(map);
    for (let w = Math.min(...ws) - 1; w <= Math.max(...ws) + 1; w++) {
        const zs = Object.keys(map[0]);
        for (let z = Math.min(...zs) - 1; z <= Math.max(...zs) + 1; z++) {
            const ys = Object.keys(map[0][0]);
            for (let y = Math.min(...ys) - 1; y <= Math.max(...ys) + 1; y++) {
                const xs = Object.keys(map[0][0][0]);
                for (let x = Math.min(...xs) - 1; x <= Math.max(...xs) + 1; x++) {
                    if (res[w] === undefined) res[w] = {};
                    if (res[w][z] === undefined) res[w][z] = {};
                    if (res[w][z][y] === undefined) res[w][z][y] = {};
                    let count = 0;
                    if (map[w] !== undefined) {
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y] !== undefined && map[w][z - 1][y][x] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y] !== undefined && map[w][z - 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y] !== undefined && map[w][z - 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y - 1] !== undefined && map[w][z - 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y + 1] !== undefined && map[w][z - 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y - 1] !== undefined && map[w][z - 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y + 1] !== undefined && map[w][z - 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y - 1] !== undefined && map[w][z - 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w][z - 1] !== undefined && map[w][z - 1][y + 1] !== undefined && map[w][z - 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y] !== undefined && map[w][z + 1][y][x] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y] !== undefined && map[w][z + 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y] !== undefined && map[w][z + 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y - 1] !== undefined && map[w][z + 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y + 1] !== undefined && map[w][z + 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y - 1] !== undefined && map[w][z + 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y + 1] !== undefined && map[w][z + 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y - 1] !== undefined && map[w][z + 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w][z + 1] !== undefined && map[w][z + 1][y + 1] !== undefined && map[w][z + 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y] !== undefined && map[w][z][y][x + 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y] !== undefined && map[w][z][y][x - 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y - 1] !== undefined && map[w][z][y - 1][x] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y + 1] !== undefined && map[w][z][y + 1][x] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y - 1] !== undefined && map[w][z][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y + 1] !== undefined && map[w][z][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y - 1] !== undefined && map[w][z][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w][z] !== undefined && map[w][z][y + 1] !== undefined && map[w][z][y + 1][x + 1] === '#') count++;
                    }
                    if (map[w - 1] !== undefined) {
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y] !== undefined && map[w - 1][z - 1][y][x] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y] !== undefined && map[w - 1][z - 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y] !== undefined && map[w - 1][z - 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y - 1] !== undefined && map[w - 1][z - 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y + 1] !== undefined && map[w - 1][z - 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y - 1] !== undefined && map[w - 1][z - 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y + 1] !== undefined && map[w - 1][z - 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y - 1] !== undefined && map[w - 1][z - 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z - 1] !== undefined && map[w - 1][z - 1][y + 1] !== undefined && map[w - 1][z - 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y] !== undefined && map[w - 1][z + 1][y][x] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y] !== undefined && map[w - 1][z + 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y] !== undefined && map[w - 1][z + 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y - 1] !== undefined && map[w - 1][z + 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y + 1] !== undefined && map[w - 1][z + 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y - 1] !== undefined && map[w - 1][z + 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y + 1] !== undefined && map[w - 1][z + 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y - 1] !== undefined && map[w - 1][z + 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z + 1] !== undefined && map[w - 1][z + 1][y + 1] !== undefined && map[w - 1][z + 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y] !== undefined && map[w - 1][z][y][x] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y] !== undefined && map[w - 1][z][y][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y] !== undefined && map[w - 1][z][y][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y - 1] !== undefined && map[w - 1][z][y - 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y + 1] !== undefined && map[w - 1][z][y + 1][x] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y - 1] !== undefined && map[w - 1][z][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y + 1] !== undefined && map[w - 1][z][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y - 1] !== undefined && map[w - 1][z][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w - 1][z] !== undefined && map[w - 1][z][y + 1] !== undefined && map[w - 1][z][y + 1][x + 1] === '#') count++;
                    }

                    if (map[w + 1] !== undefined) {
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y] !== undefined && map[w + 1][z - 1][y][x] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y] !== undefined && map[w + 1][z - 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y] !== undefined && map[w + 1][z - 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y - 1] !== undefined && map[w + 1][z - 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y + 1] !== undefined && map[w + 1][z - 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y - 1] !== undefined && map[w + 1][z - 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y + 1] !== undefined && map[w + 1][z - 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y - 1] !== undefined && map[w + 1][z - 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z - 1] !== undefined && map[w + 1][z - 1][y + 1] !== undefined && map[w + 1][z - 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y] !== undefined && map[w + 1][z + 1][y][x] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y] !== undefined && map[w + 1][z + 1][y][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y] !== undefined && map[w + 1][z + 1][y][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y - 1] !== undefined && map[w + 1][z + 1][y - 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y + 1] !== undefined && map[w + 1][z + 1][y + 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y - 1] !== undefined && map[w + 1][z + 1][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y + 1] !== undefined && map[w + 1][z + 1][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y - 1] !== undefined && map[w + 1][z + 1][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z + 1] !== undefined && map[w + 1][z + 1][y + 1] !== undefined && map[w + 1][z + 1][y + 1][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y] !== undefined && map[w + 1][z][y][x] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y] !== undefined && map[w + 1][z][y][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y] !== undefined && map[w + 1][z][y][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y - 1] !== undefined && map[w + 1][z][y - 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y + 1] !== undefined && map[w + 1][z][y + 1][x] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y - 1] !== undefined && map[w + 1][z][y - 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y + 1] !== undefined && map[w + 1][z][y + 1][x - 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y - 1] !== undefined && map[w + 1][z][y - 1][x + 1] === '#') count++;
                        if (count < 5 && map[w + 1][z] !== undefined && map[w + 1][z][y + 1] !== undefined && map[w + 1][z][y + 1][x + 1] === '#') count++;
                    }
                    res[w][z][y][x] = (map[w] !== undefined && map[w][z] !== undefined && map[w][z][y] !== undefined && map[w][z][y][x] === '#' && count === 2) || count === 3 ? '#' : '.';
                    if (res[w][z][y][x] === '#') acc++;
                }
            }
        }
    }
    map = JSON.parse(JSON.stringify(res));
}
console.log(acc);
