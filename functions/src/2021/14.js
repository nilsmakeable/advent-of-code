const list = document.querySelector('pre').innerText.split('\n');

const str = list[0];
const arr = [];
const map = {};
const count = {};
for (let i = 2; i < list.length; i++) {
    const part = list[i].split(' -> ');
    map[part[0]] = part[1];
}
count[str[0]] = 1;
for (let i = 1; i < str.length; i++) {
    arr.push(str[i - 1] + str[i]);
    if (count[str[i]] === undefined) count[str[i]] = 0;
    count[str[i]]++;
}

const steps = 10;

let res = new Map(arr.map((i, n) => [n, i]));
for (let i = 0; i < steps; i++) {
    const len = res.size;
    const tmp = new Map();
    let index = 0;
    for (let n = 0; n < len; n++) {
        tmp.set(index++, res.get(n)[0] + map[res.get(n)]);
        tmp.set(index++, map[res.get(n)] + res.get(n)[1]);
        if (count[map[res.get(n)]] === undefined) count[map[res.get(n)]] = 0;
        count[map[res.get(n)]]++;
    }
    res = tmp;
}

let most = 0;
let mostChar = '';
let least = 999999;
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
