const data = document.querySelector('pre').innerText.split('\n');
data.pop();
const mem = [];
let mask = '';
data.forEach((line) => {
    if (line.indexOf('mask = ') === -1) {
        const parts = line.split('] = ');
        const index = parts[0].replace('mem[', '');
        let val = (parseInt(index) >>> 0).toString(2);
        if (val.length < mask.length) {
            val = '0'.repeat(mask.length - val.length) + val;
        }
        val = val.split('');
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === 'X') val[i] = 'x';
            if (mask[i] === '1') val[i] = '1';
        }

        val = val.join('');
        let indexes = [val];
        while (val.indexOf('x') !== -1) {
            const tmp = indexes;
            indexes = [];
            for (const i of tmp) {
                indexes.push(i.replace('x', '0'));
                indexes.push(i.replace('x', '1'));
            }
            val = val.replace('x', '-');
        }
        for (const i of indexes) mem[parseInt(i, 2)] = parseInt(parts[1]);
    } else {
        mask = line.replace('mask = ', '');
    }
});
let acc = 0;
Object.keys(mem).forEach((key) => {
    acc += mem[key];
});
console.log(acc);
