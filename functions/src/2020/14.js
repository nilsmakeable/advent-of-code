const data = document.querySelector('pre').innerText.split('\n');
data.pop();
const mem = [];
let mask = '';
data.forEach((line) => {
    if (line.indexOf('mask = ') === -1) {
        const parts = line.split('] = ');
        const index = parts[0].replace('mem[', '');
        let val = (parseInt(parts[1]) >>> 0).toString(2);
        if (val.length < mask.length) {
            val = '0'.repeat(mask.length - val.length) + val;
        }
        val = val.split('');
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === '0') val[i] = '0';
            if (mask[i] === '1') val[i] = '1';
        }
        val = val.join('');
        mem[index] = parseInt(val, 2);
    } else {
        mask = line.replace('mask = ', '');
    }
});
let acc = 0;
Object.keys(mem).forEach((key) => {
    acc += mem[key];
});
console.log(acc);
