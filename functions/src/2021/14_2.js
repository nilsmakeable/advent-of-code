const list = document.querySelector('pre').innerText.split('\n');

const str = list[0];
const arr = {};
const map = {};
const count = {};
for (let i = 2; i < list.length; i++) {
    const part = list[i].split(' -> ');
    map[part[0]] = part[1];
}
count[str[0]] = 1;
for (let i = 1; i < str.length; i++) {
    const key = str[i - 1] + str[i];
    if (arr[key] === undefined) arr[key] = 0;
    arr[key]++;
    if (count[str[i]] === undefined) count[str[i]] = 0;
    count[str[i]]++;
}

const steps = 40;

for (let i = 0; i < steps; i++) {
    const tmp = JSON.parse(JSON.stringify(arr));
    Object.keys(arr).forEach((key) => {
        const val = tmp[key];
        arr[key] -= val;
        if (arr[key[0] + map[key]] === undefined) arr[key[0] + map[key]] = 0;
        arr[key[0] + map[key]] += val;
        if (arr[map[key] + key[1]] === undefined) arr[map[key] + key[1]] = 0;
        arr[map[key] + key[1]] += val;
        if (count[map[key]] === undefined) count[map[key]] = 0;
        count[map[key]] += val;
    });
}

let most = 0;
let mostChar = '';
let least = Infinity;
let leastChar = '';

Object.keys(count).forEach((key) => {
    if (count[key] > most) {
        most = count[key];
        mostChar = key;
    }
    if (count[key] < least) {
        least = count[key];
        leastChar = key;
    }
});
console.log(count[mostChar] - count[leastChar]);
