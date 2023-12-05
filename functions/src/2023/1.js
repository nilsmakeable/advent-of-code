const list = document.querySelector('pre').innerText.split('\n');
list.pop();
let acc = 0;

const sanisited = list.map((row) => {
    return row.replace(/[a-zA-Z]/g, '');
});

sanisited.forEach((row) => {
    acc += parseInt(`${row[0]}${row[row.length - 1]}`);
});
console.log(`first number: ${acc}`);

acc = 0;
list.forEach((row) => {
    const digits = row
        .split('')
        .map((c, i) => {
            const nxt = row.slice(i);
            console.log(nxt);
            if (nxt.startsWith('one')) return 1;
            if (nxt.startsWith('two')) return 2;
            if (nxt.startsWith('three')) return 3;
            if (nxt.startsWith('four')) return 4;
            if (nxt.startsWith('five')) return 5;
            if (nxt.startsWith('six')) return 6;
            if (nxt.startsWith('seven')) return 7;
            if (nxt.startsWith('eight')) return 8;
            if (nxt.startsWith('nine')) return 9;
            return parseInt(c);
        })
        .filter((n) => !!n);
    acc += Number(`${digits[0]}${digits.at(-1)}`);
});
console.log(`secound number: ${acc}`);
