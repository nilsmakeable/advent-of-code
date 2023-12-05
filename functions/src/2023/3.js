const list = document.querySelector('pre').innerText.trim().split('\n');

const map = list.map((row) => row.split(''));

let agg = 0;
let agg2 = 0;
const map2 = list.map((row) => row.split('').map((x) => []));

for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
        if (Number.isInteger(parseInt(map[x][y]))) {
            let number = map[x][y];
            let i = 1;
            while (Number.isInteger(parseInt(map[x][y + i]))) {
                number += map[x][y + i];
                i++;
            }
            i--;
            let include = false;
            for (let j = Math.max(0, x - 1); j <= Math.min(x + 1, map.length - 1); j++) {
                for (let k = Math.max(0, y - 1); k <= Math.min(y + i + 1, map[0].length - 1); k++) {
                    if (map[j][k].replace(/[0-9.]/g, '').length > 0) {
                        include = true;
                    }
                    if (map[j][k] === '*') {
                        map2[j][k].push(parseInt(number));
                    }
                }
            }
            if (include) {
                agg += parseInt(number);
            }
            y += i;
        }
    }
}

console.log(`Part 1: ${agg}`);
map2.forEach((row) => {
    row.forEach((col) => {
        if (col.length === 2) {
            agg2 += col[0] * col[1];
        }
    });
});
console.log(`Part 2: ${agg2}`);
