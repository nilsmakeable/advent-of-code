const input = document.querySelector('pre').innerText.split('\n');
input.pop();
let data = input.map((s) => s.split(',').join('').trim());

data = data.map((s) => {
    return s.split('').map((s) => (Number.isNaN(s) ? s : Number(s)));
});

function add(a, b) {
    return ['[', ...a, ...b, ']'];
}

function explode(a) {
    let open = 0;
    for (let i = 0; i < a.length; i++) {
        const e = a[i];
        if (e == '[') open++;
        if (e == ']') open--;
        if (open == 5) {
            const buf = a.splice(i, 4);
            let up = i - 1;
            let down = i;
            while (down--) {
                if (!Number.isNaN(a[down])) {
                    a[down] += buf[1];
                    break;
                }
            }
            while (up++ < a.length) {
                if (!Number.isNaN(a[up])) {
                    a[up] += buf[2];
                    break;
                }
            }
            a.splice(i, 0, 0);
            explode(a);
            return true;
        }
    }
    return false;
}

function split(a) {
    for (let i = 0; i < a.length; i++) {
        const e = a[i];
        if (!Number.isNaN(e) && e > 9) {
            const l = Math.floor(e / 2);
            const h = Math.ceil(e / 2);
            const s = ['[', l, h, ']'];
            a.splice(i, 1, ...s);
            return true;
        }
    }
    return false;
}

function magnitude(a) {
    for (let i = 0; i < a.length; i++) {
        const e = a[i];
        if (e == ']') {
            const buf = a.splice(i - 3, 4);
            const sum = buf[1] * 3 + buf[2] * 2;
            a.splice(i - 3, 0, sum);
            i -= 3;
        }
    }
    return a;
}

let sum = data[0];
for (let i = 0; i < data.length - 1; i++) {
    sum = add(sum, data[i + 1]);
    while (explode(sum) || split(sum));
}
const mag = magnitude(sum);
console.log(1, mag[0]);

let max = 0;
for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length; j++) {
        if (i != j) {
            sum = add(data[i], data[j]);
            while (explode(sum) || split(sum));
            max = Math.max(max, magnitude(sum));
        }
    }
}
console.log(2, max);
