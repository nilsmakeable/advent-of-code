const list = document.querySelector('pre').innerText.split('\n');

let stack = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };
for (let i = 7; i >= 0; i--) {
    const row = list[i].replace(new RegExp(``, 'g'), '').replace(new RegExp(' {4}', 'g'), ' ').split(' ');
    for (let j = 0; j < row.length; j++) {
        if (row[j] !== '') stack[j].push(row[j].replace('[', '').replace(']', ''));
    }
}

for (let i = 10; i < list.length; i++) {
    const row = list[i].split(' ');
    for (let n = 0; n < parseInt(row[1]); n++) {
        stack[parseInt(row[5]) - 1].push(stack[parseInt(row[3]) - 1].pop());
    }
}
console.log(`first answer: ${stack[0].pop()}${stack[1].pop()}${stack[2].pop()}${stack[3].pop()}${stack[4].pop()}${stack[5].pop()}${stack[6].pop()}${stack[7].pop()}${stack[8].pop()}`);
const placeholder = [];
stack = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };
for (let i = 7; i >= 0; i--) {
    const row = list[i].replace(new RegExp(``, 'g'), '').replace(new RegExp(' {4}', 'g'), ' ').split(' ');
    for (let j = 0; j < row.length; j++) {
        if (row[j] !== '') stack[j].push(row[j].replace('[', '').replace(']', ''));
    }
}

for (let i = 10; i < list.length; i++) {
    const row = list[i].split(' ');
    for (let n = 0; n < parseInt(row[1]); n++) {
        placeholder.push(stack[parseInt(row[3]) - 1].pop());
    }
    while (placeholder.length > 0) stack[parseInt(row[5]) - 1].push(placeholder.pop());
}
console.log(`secound answer: ${stack[0].pop()}${stack[1].pop()}${stack[2].pop()}${stack[3].pop()}${stack[4].pop()}${stack[5].pop()}${stack[6].pop()}${stack[7].pop()}${stack[8].pop()}`);
