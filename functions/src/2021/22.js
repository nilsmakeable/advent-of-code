const list = document.querySelector('pre').innerText.split('\n');
list.pop();
let cubes = [];
let part1Done = false;

const contains = (c1, c2) => {
    return c1.x1 <= c2.x1 && c1.x2 >= c2.x2 && c1.y1 <= c2.y1 && c1.y2 >= c2.y2 && c1.z1 <= c2.z1 && c1.z2 >= c2.z2;
};

const intersects = (c1, c2) => {
    return c1.x1 <= c2.x2 && c1.x2 >= c2.x1 && c1.y1 <= c2.y2 && c1.y2 >= c2.y1 && c1.z1 <= c2.z2 && c1.z2 >= c2.z1;
};

const resolve = (c1, c2) => {
    if (contains(c2, c1)) {
        return [];
    }

    if (!intersects(c1, c2)) {
        return [c1];
    }

    const xSplits = [c2.x1, c2.x2].filter((x) => c1.x1 < x && x < c1.x2);
    const ySplits = [c2.y1, c2.y2].filter((y) => c1.y1 < y && y < c1.y2);
    const zSplits = [c2.z1, c2.z2].filter((z) => c1.z1 < z && z < c1.z2);

    const xv = [c1.x1, ...xSplits, c1.x2];
    const yv = [c1.y1, ...ySplits, c1.y2];
    const zv = [c1.z1, ...zSplits, c1.z2];

    const res = [];
    for (let i = 0; i < xv.length - 1; i++) {
        for (let j = 0; j < yv.length - 1; j++) {
            for (let k = 0; k < zv.length - 1; k++) {
                res.push({
                    x1: xv[i],
                    y1: yv[j],
                    z1: zv[k],
                    x2: xv[i + 1],
                    y2: yv[j + 1],
                    z2: zv[k + 1],
                });
            }
        }
    }

    return res.filter((c) => !contains(c2, c));
};

list.forEach((line) => {
    const parts = line.split(',');
    const state = parts[0].indexOf('on x') !== -1 ? 'on' : 'off';
    const x1 = parseInt(parts[0].split('..')[0].replace('on x=', '').replace('off x=', ''));
    const x2 = parseInt(parts[0].split('..')[1]);
    const y1 = parseInt(parts[1].split('..')[0].replace('y=', ''));
    const y2 = parseInt(parts[1].split('..')[1]);
    const z1 = parseInt(parts[2].split('..')[0].replace('z=', ''));
    const z2 = parseInt(parts[2].split('..')[1]);
    if (!part1Done && (x2 < -50 || x1 > 50 || y2 < -50 || y1 > 50 || z2 < -50 || z1 > 50)) {
        part1Done = true;
        let count = 0;
        cubes.forEach((cube) => {
            count += Math.abs(cube.x1 - cube.x2) * Math.abs(cube.y1 - cube.y2) * Math.abs(cube.z1 - cube.z2);
        });
        console.log(count); // 648.023
    }
    const curCube = { x1, y1, z1, x2: x2 + 1, y2: y2 + 1, z2: z2 + 1 };
    cubes = cubes.flatMap((c) => resolve(c, curCube));
    if (state === 'on') cubes.push(curCube);
});

let count = BigInt(0);
cubes.forEach((cube) => {
    count += BigInt(Math.abs(cube.x1 - cube.x2) * Math.abs(cube.y1 - cube.y2) * Math.abs(cube.z1 - cube.z2));
});

console.log(count.toString()); // 1.285.677.377.848.549
