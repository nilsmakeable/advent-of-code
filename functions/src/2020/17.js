const list = document.querySelector('pre').innerText.split('\n');

let map = { 0: {} };

for (let y = 0; y < list.length; y++) {
    map[0][y] = list[y].split('');
}
const steps = 6;
let acc = 0;
for (let step = 0; step < steps; step++) {
    const zs = Object.keys(map);
    const res = {};
    acc = 0;
    for (let z = Math.min(...zs) - 1; z <= Math.max(...zs) + 1; z++) {
        const ys = Object.keys(map[0]);
        for (let y = Math.min(...ys) - 1; y <= Math.max(...ys) + 1; y++) {
            const xs = Object.keys(map[0][0]);
            for (let x = Math.min(...xs) - 1; x <= Math.max(...xs) + 1; x++) {
                if (res[z] === undefined) res[z] = {};
                if (res[z][y] === undefined) res[z][y] = {};
                let count = 0;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y] !== undefined && map[z - 1][y][x] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y] !== undefined && map[z - 1][y][x + 1] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y] !== undefined && map[z - 1][y][x - 1] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y - 1] !== undefined && map[z - 1][y - 1][x] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y + 1] !== undefined && map[z - 1][y + 1][x] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y - 1] !== undefined && map[z - 1][y - 1][x - 1] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y + 1] !== undefined && map[z - 1][y + 1][x - 1] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y - 1] !== undefined && map[z - 1][y - 1][x + 1] === '#') count++;
                if (count < 5 && map[z - 1] !== undefined && map[z - 1][y + 1] !== undefined && map[z - 1][y + 1][x + 1] === '#') count++;

                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y] !== undefined && map[z + 1][y][x] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y] !== undefined && map[z + 1][y][x + 1] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y] !== undefined && map[z + 1][y][x - 1] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y - 1] !== undefined && map[z + 1][y - 1][x] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y + 1] !== undefined && map[z + 1][y + 1][x] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y - 1] !== undefined && map[z + 1][y - 1][x - 1] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y + 1] !== undefined && map[z + 1][y + 1][x - 1] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y - 1] !== undefined && map[z + 1][y - 1][x + 1] === '#') count++;
                if (count < 5 && map[z + 1] !== undefined && map[z + 1][y + 1] !== undefined && map[z + 1][y + 1][x + 1] === '#') count++;

                if (count < 5 && map[z] !== undefined && map[z][y] !== undefined && map[z][y][x + 1] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y] !== undefined && map[z][y][x - 1] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y - 1] !== undefined && map[z][y - 1][x] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y + 1] !== undefined && map[z][y + 1][x] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y - 1] !== undefined && map[z][y - 1][x - 1] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y + 1] !== undefined && map[z][y + 1][x - 1] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y - 1] !== undefined && map[z][y - 1][x + 1] === '#') count++;
                if (count < 5 && map[z] !== undefined && map[z][y + 1] !== undefined && map[z][y + 1][x + 1] === '#') count++;
                res[z][y][x] = (map[z] !== undefined && map[z][y] !== undefined && map[z][y][x] === '#' && count === 2) || count === 3 ? '#' : '.';
                if (res[z][y][x] === '#') acc++;
            }
        }
    }
    map = JSON.parse(JSON.stringify(res));
}
console.log(acc);
