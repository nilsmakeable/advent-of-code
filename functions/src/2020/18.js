const input = document.querySelector('pre').innerText.split('\n');
input.pop();
let acc = 0;

const findClosingParen = (text, openPos) => {
    if (openPos === undefined) return -1;
    let closePos = openPos;
    let counter = 1;
    while (counter > 0 && closePos <= text.length) {
        const c = text[++closePos];
        if (c === '(') {
            counter++;
        } else if (c === ')') {
            counter--;
        }
        if (closePos < 0) return 0;
    }
    return closePos;
};

const findOpenParen = (text, closePos) => {
    if (closePos === undefined) return -1;
    let openPos = closePos;
    let counter = 1;
    while (counter > 0 && openPos >= 0) {
        const c = text[--openPos];
        if (c === '(') {
            counter--;
        } else if (c === ')') {
            counter++;
        }
    }
    return openPos;
};

const evaluate = (line) => {
    if (line[0] === '(') {
        line = line.replace(`(${line.substr(1, findClosingParen(line, 0) - 1)})`, evaluate(line.substr(1, findClosingParen(line, 0) - 1)));
    }
    const ind = /[+*]/.exec(line);
    if (ind === null) return line;
    let index = ind.index;
    let opp = line[index];
    let left = line.substr(0, index);
    line = line.replace(`${left}${opp}`, '');

    while (index !== null) {
        if (line[0] === '(') {
            line = line.replace(`(${line.substr(1, findClosingParen(line, 0) - 1)})`, evaluate(line.substr(1, findClosingParen(line, 0) - 1)));
        }
        index = /[+*]/.exec(line);
        const right = index === null ? line : `${line}`.substr(0, index.index);
        left = opp === '*' ? left * right : parseInt(left) + parseInt(right);
        opp = index !== null ? line[index.index] : '';
        line = `${line}`.replace(`${right}${opp}`, '');
    }
    return left;
};
input.forEach((line) => {
    acc += evaluate(line.replace(/\s/g, ''));
});
console.log(acc);
acc = 0;
input.forEach((line) => {
    const orgLine = line;
    line = line.replace(/\s/g, '').replace(/[+]/g, '.');
    while (line.indexOf('.') !== -1) {
        let start = 0;
        let end = 0;
        if (line[line.indexOf('.') - 1] === ')') {
            start = findOpenParen(line, line.indexOf('.') - 1) + 1;
        } else {
            let index = line.indexOf('.') - 1;
            while (line[index] !== '.' && line[index] !== '+' && line[index] !== '*' && line[index] !== '(' && index >= 0) {
                index--;
            }

            if (line[index] === ')') start = findOpenParen(line, index) + 1;
            else start = index + 1;
        }

        if (line[line.indexOf('.') + 1] === '(') {
            end = findClosingParen(line, line.indexOf('.') + 1) + 1;
        } else {
            let index = line.indexOf('.') + 1;
            while (line[index] !== '.' && line[index] !== '+' && line[index] !== '*' && line[index] !== ')' && line[index] !== '(' && index < line.length) {
                index++;
            }
            if (line[index] === '(') end = findClosingParen(line, index) + 1;
            else end = index;
        }
        line = line.replace('.', '+');
        line = `${line.substring(0, start)}(${line.substring(start, end)})${line.substring(end)}`;
    }
    const res1 = parseInt(eval(line));
    const res2 = parseInt(evaluate(line));

    if (res1 !== res2) {
        console.log(orgLine.replace(/\s/g, ''));
        console.log(line);
    }
    acc += res1;
});
console.log(acc);
