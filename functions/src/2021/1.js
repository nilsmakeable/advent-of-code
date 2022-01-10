const list = document.querySelector('pre').innerText.split('\n');
let acc = 0;
let last = null;
list.forEach((row) => {
    if (last !== null && row > last) acc++;
    last = row;
});
console.log(`first number:${acc}`);
