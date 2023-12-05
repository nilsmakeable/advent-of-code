const list = document.querySelector('pre').innerText.split('\n');
let acc = 0;

list.forEach((row) => {
    const parts = row.split(' ');
    switch (parts[1]) {
        case 'Y':
            acc += 2;
            if (parts[0] === 'A') acc += 6;
            if (parts[0] === 'B') acc += 3;
            break;
        case 'X':
            acc += 1;
            if (parts[0] === 'A') acc += 3;
            if (parts[0] === 'C') acc += 6;
            break;
        case 'Z':
            acc += 3;
            if (parts[0] === 'B') acc += 6;
            if (parts[0] === 'C') acc += 3;
            break;
        default:
    }
});
console.log(`first number: ${acc}`);

acc = 0;

list.forEach((row) => {
    const parts = row.split(' ');
    switch (parts[1]) {
        case 'Y': // Draw
            acc += 3;
            if (parts[0] === 'A') acc += 1;
            if (parts[0] === 'B') acc += 2;
            if (parts[0] === 'C') acc += 3;
            break;
        case 'X': // loose
            if (parts[0] === 'A') acc += 3;
            if (parts[0] === 'B') acc += 1;
            if (parts[0] === 'C') acc += 2;
            break;
        case 'Z': // win
            acc += 6;
            if (parts[0] === 'A') acc += 2;
            if (parts[0] === 'B') acc += 3;
            if (parts[0] === 'C') acc += 1;
            break;
        default:
    }
});

console.log(`secound number: ${acc}`);
