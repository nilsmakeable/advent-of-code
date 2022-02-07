const list = document.querySelector('pre').innerText.split('\n');
list.pop();
const tileList = [];
let acc = 0;
list.forEach((line) => {
    const tile = { q: 0, s: 0, r: 0 };
    while (line.length > 0) {
        if (line[0] === 'e') {
            tile.q++;
            tile.s--;
            line = line.substr(1);
        } else if (line[0] === 's') {
            tile.r++;
            if (line[1] === 'e') tile.s--;
            else tile.q--;

            line = line.substr(2);
        } else if (line[0] === 'w') {
            tile.s++;
            tile.q--;
            line = line.substr(1);
        } else if (line[0] === 'n') {
            tile.r--;
            if (line[1] === 'w') tile.s++;
            else tile.q++;
            line = line.substr(2);
        }
    }
    if (tileList[tile.q] === undefined) tileList[tile.q] = [];
    if (tileList[tile.q][tile.s] === undefined) tileList[tile.q][tile.s] = [];
    if (tileList[tile.q][tile.s][tile.r] === undefined) tileList[tile.q][tile.s][tile.r] = 0;
    if (tileList[tile.q][tile.s][tile.r] === 0) {
        tileList[tile.q][tile.s][tile.r] = 1;
        acc++;
    } else {
        tileList[tile.q][tile.s][tile.r] = 0;
        acc--;
    }
});
console.log(`first number: ${acc}`);
