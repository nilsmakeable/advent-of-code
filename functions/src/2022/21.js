const yellNumber =
    (n) =>
    (_arr) =>
        n;
const yellResult =
    ([a, o, b], d) =>
    (arr) => {
        const va = d[a](arr);
        const vb = d[b](arr);
        if (va === undefined) {
            arr.push([vb, o, true]);
            return undefined;
        } else if (vb === undefined) {
            arr.push([va, o, false]);
            return undefined;
        }
        return eval(`${va} ${o} ${vb}`);
    };
const parse = (dict, line) => {
    const [name, expression] = line.split(': ');
    const parts = expression.split(' ');
    dict[name] =
        parts.length > 1 ? yellResult(parts, dict) : yellNumber(+expression);
    return dict;
};
const solve = () => {
    const d = document.querySelector('pre').innerText.trim().split('\n').reduce(parse, {});
    const p1 = d['root']([]);
    d['humn'] = () => undefined;
    const tree = [];
    d['root'](tree);
    let r = tree[tree.length - 1][0];
    let rp = 0;
    for (let i = tree.length - 2; i >= 0; i--) {
        const [v, o, rightSide] = tree[i];
        if (o === '+') {
            // rp + v = r
            rp = r - v;
        } else if (o === '*') {
            // rp * v = r
            rp = r / v;
        } else if (o === '-') {
            // rp - v = r (if rl = 1)
            // v - rp = r (if rl = 2)
            rp = rightSide ? r + v : v - r;
        } else {
            // rp / v = r (if rl = 1)
            // v / rp = r (if rl = 2)
            rp = rightSide ? r * v : v / r;
        }
        r = rp;
    }
    return [p1, r];
};

solve();