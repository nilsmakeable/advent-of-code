const list = document.querySelector('pre').innerText.split(',');
let min = 999;
let max = 0;
const arr = [];

list.forEach((row) => {
    row = parseInt(row);
    if (min > row) min = row;
    if (max < row) max = row;
    if (arr[row] === undefined) arr[row] = 0;
    arr[row]++;
});

let minFule = 99999999999;
for (let i = min; i <= max; i++) {
    let fule = 0;
    Object.keys(arr).forEach((key) => {
        fule += Math.abs(parseInt(key) - i) * arr[key];
    });
    if (fule < minFule) minFule = fule;
}

console.log(`first number: ${minFule}`);

minFule = 99999999999;
for (let i = min; i <= max; i++) {
    let fule = 0;
    Object.keys(arr).forEach((key) => {
        fule += ((Math.abs(parseInt(key) - i) * (Math.abs(parseInt(key) - i) + 1)) / 2) * arr[key];
    });
    if (fule < minFule) minFule = fule;
}

console.log(`secound number: ${minFule}`);
