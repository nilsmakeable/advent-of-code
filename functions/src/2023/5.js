const list = document.querySelector('pre').innerText.trim().split('\n');
let initialSeeds = [];
let seeds = [];
const maps = {};

let mapIndex = 0;
list.forEach((line) => {
    if (line === '') return;
    if (line.startsWith('seeds:'))
        initialSeeds = line
            .replace('seeds: ', '')
            .split(' ')
            .map((s) => parseInt(s));
    else if (line.includes(':')) {
        mapIndex++;
    } else {
        if (!maps[mapIndex]) maps[mapIndex] = [];
        maps[mapIndex].push(line.split(' ').map((s) => parseInt(s)));
    }
});
seeds = initialSeeds;
Object.values(maps).forEach((map) => {
    seeds = seeds.map((seed) => {
        const mapping = map.find((row) => seed >= row[1] && seed <= row[1] + row[2]);
        if (!mapping) return seed;
        return seed + mapping[0] - mapping[1];
    });
});

console.log(`Part 1: ${seeds.sort((a, b) => a - b)[0]}`);
const startTime = new Date().getTime();
let minLocation = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < initialSeeds.length; i += 2) {
    for (let seed = initialSeeds[i]; seed <= initialSeeds[i] + initialSeeds[i + 1]; seed++) {
        let location = seed;
        Object.values(maps).forEach((map) => {
            const mapping = map.find((row) => location >= row[1] && location <= row[1] + row[2]);
            if (mapping) location = location + mapping[0] - mapping[1];
        });
        if (minLocation > location) minLocation = location;
    }
}
console.log(`Part 2: ${minLocation}`, `(${new Date().getTime() - startTime}ms)`);
