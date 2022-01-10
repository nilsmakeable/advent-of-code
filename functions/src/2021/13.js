const list = document.querySelector('pre').innerText.split('\n');
const map = [];
const folds = [];
let maxX = 0;
let maxY = 0;
list.forEach((line) => {
    if (line.indexOf('fold') === -1) {
        const [x, y] = line.split(',');
        if (map[parseInt(y)] === undefined) map[parseInt(y)] = [];
        map[parseInt(y)][parseInt(x)] = '#';
        if (maxX < parseInt(x)) maxX = parseInt(x);
        if (maxY < parseInt(y)) maxY = parseInt(y);
    } else folds.push(line);
});

for (let y = 0; y <= maxY; y++) {
    if (map[y] === undefined) map[y] = [];
    if (map)
        for (let x = 0; x <= maxX; x++) {
            if (map[y][x] === undefined) map[y][x] = '.';
        }
}

const fold = (mmap, toFold) => {
    const ret = [];
    if (toFold.indexOf('fold along y=') !== -1) {
        toFold = parseInt(toFold.replace('fold along y=', ''));
        for (let y = 0; y < toFold; y++) {
            ret.push(mmap[y]);
        }
        for (let y = toFold + 1; y < mmap.length; y++) {
            for (let x = 0; x < mmap[y].length; x++) {
                if (ret[mmap.length - y - 1][x] !== '#' && mmap[y][x] === '#') ret[mmap.length - y - 1][x] = '#';
            }
        }
    } else {
        toFold = parseInt(toFold.replace('fold along x=', ''));
        for (let y = 0; y < mmap.length; y++) {
            ret[y] = [];
            for (let x = 0; x < mmap[y].length; x++) {
                if (x < toFold + 1) {
                    ret[y][x] = mmap[y][x];
                } else if (ret[y][mmap[y].length - x - 1] !== '#' && mmap[y][x] === '#') ret[y][mmap[y].length - x - 1] = '#';
            }
        }
    }
    return ret;
};
let ret = fold(map, folds[0]);
let numHash = 0;
for (let y = 0; y < ret.length; y++) for (let x = 0; x < ret[y].length; x++) if (ret[y][x] === '#') numHash++;
console.log(numHash);

for (let i = 1; i < folds.length; i++) {
    ret = fold(ret, folds[i]);
}

for (let y = 0; y < ret.length; y++) console.log(ret[y].join('').replace(/[.]/g, ' ').replace(/[#]/g, '█'));
