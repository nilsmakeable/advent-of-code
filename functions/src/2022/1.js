const list = document.querySelector('pre').innerText.split('\n');
let acc = 0;
const elves = [];
list.forEach((row) => {
    if (row !== '') acc += parseInt(row);
    else {
        elves.push(acc);
        acc = 0;
    }
});
elves.push(acc);
console.log(`first number: ${Math.max(...elves)}`);

elves.sort((a, b) => b - a);
console.log(`secound number: ${elves[0] + elves[1] + elves[2]}`);
