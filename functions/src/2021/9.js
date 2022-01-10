const list = document.querySelector('pre').innerText.split('\n');
list.pop();
const lowpoints = [];
let acc = 0;
for (let y = 0; y < list.length; y++) {
    for (let x = 0; x < list[0].length; x++) {
        let lower = 0;
        if (list[y - 1] !== undefined && parseInt(list[y][x]) >= parseInt(list[y - 1][x])) lower++;
        if (list[y + 1] !== undefined && parseInt(list[y][x]) >= parseInt(list[y + 1][x])) lower++;
        if (list[y][x - 1] !== undefined && parseInt(list[y][x]) >= parseInt(list[y][x - 1])) lower++;
        if (list[y][x + 1] !== undefined && parseInt(list[y][x]) >= parseInt(list[y][x + 1])) lower++;
        if (lower === 0) {
            lowpoints.push([y, x]);
            acc += parseInt(list[y][x]) + 1;
        }
    }
}
console.log(acc);

const bassins = [];
const counted = [];
const queue = [];
const bassinCalc = () => {
    let size = 0;
    while (queue.length > 0) {
        const current = queue.pop();
        const x = current[0];
        const y = current[1];
        if (list[y - 1] !== undefined && parseInt(list[y - 1][x]) !== 9 && parseInt(list[y][x]) <= parseInt(list[y - 1][x]) && counted[`${x},${parseInt(y) - 1}`] === undefined) {
            size++;
            queue.push([x, parseInt(y) - 1]);
            counted[`${x},${parseInt(y) - 1}`] = true;
        }

        if (list[y + 1] !== undefined && parseInt(list[y + 1][x]) !== 9 && parseInt(list[y][x]) <= parseInt(list[y + 1][x]) && counted[`${x},${parseInt(y) + 1}`] === undefined) {
            size++;
            queue.push([x, parseInt(y) + 1]);
            counted[`${x},${parseInt(y) + 1}`] = true;
        }
        if (list[y][x - 1] !== undefined && parseInt(list[y][x - 1]) !== 9 && parseInt(list[y][x]) <= parseInt(list[y][x - 1]) && counted[`${parseInt(x) - 1},${y}`] === undefined) {
            size++;
            queue.push([parseInt(x) - 1, y]);
            counted[`${parseInt(x) - 1},${y}`] = true;
        }
        if (list[y][x + 1] !== undefined && parseInt(list[y][x + 1]) !== 9 && parseInt(list[y][x]) <= parseInt(list[y][x + 1]) && counted[`${parseInt(x) + 1},${y}`] === undefined) {
            size++;
            queue.push([parseInt(x) + 1, y]);
            counted[`${parseInt(x) + 1},${y}`] = true;
        }
        console.log(queue.length);
    }
    return size;
};
lowpoints.forEach((lowpoint) => {
    const y = lowpoint[0];
    const x = lowpoint[1];
    console.log('start', { x, y });
    queue.push([x, y]);
    bassins.push(bassinCalc() + 1);
    console.log('', '');
});

bassins.sort((a, b) => a - b);
console.log(bassins.pop() * bassins.pop() * bassins.pop());
