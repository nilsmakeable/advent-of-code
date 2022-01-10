const list = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`.split('\n');

const findClosingParen = (text, openPos) => {
    let closePos = openPos;
    let counter = 1;
    while (counter > 0) {
        const c = text[++closePos];
        if (c == '[') {
            counter++;
        } else if (c == ']') {
            counter--;
        }
    }
    return closePos;
};

const parseLine = (line) => {
    const arr = [];
    if (line === '') return null;
    if (!Number.isNaN(parseInt(line[0]))) return parseInt(line[0]);
    arr[0] = parseLine(line.substr(1, line[1] === '[' ? findClosingParen(line, 1) : 1));
    arr[1] = parseLine(line.substr(line[2] === ',' ? 3 : findClosingParen(line, 1) + 2));
    return arr;
};

const add = (nr1, nr2) => {
    return [nr1, nr2];
};

const explode = (line, debth, left, right, found) => {
    let replaced0 = false;
    let replaced1 = false;

    if (!found) {
        if (Array.isArray(line[0])) {
            const ret = explode(line[0], debth + 1, left, right, found);
            found = ret.found;
            line[0] = ret.line;
            replaced0 = true;
            left = ret.left;
            right = ret.right;
        }

        if (!found && Array.isArray(line[1])) {
            const ret = explode(line[1], debth + 1, left, right, found);
            found = ret.found;
            line[1] = ret.line;
            replaced1 = true;
            left = ret.left;
            right = ret.right;
        }
        if (debth > 3 && !Array.isArray(line[0]) && !Array.isArray(line[1]) && !found) {
            return { line: 0, found: true, left: line[0], right: line[1] };
        }
    }
    if (found && (left > 0 || right > 0)) {
        if (left > 0 && !replaced0) {
            if (Array.isArray(line[0])) {
                explode(line[0], debth + 1, 0, left, true);
            } else {
                line[0] += left;
            }
            left = 0;
        }
        if (right > 0 && !replaced1) {
            if (Array.isArray(line[1])) {
                explode(line[1], debth + 1, right, 0, true);
            } else {
                line[1] += right;
            }
            right = 0;
        }
    }
    return { line, found, left, right };
};
const split = (line, found) => {
    if (found) return found;
    if (Array.isArray(line[0])) found = split(line[0], found);
    else if (line[0] > 9) {
        line[0] = [Math.floor(line[0] / 2), Math.ceil(line[0] / 2)];
        found = true;
    }
    if (Array.isArray(line[1])) found = split(line[1], found);
    else if (!found && line[1] > 9) {
        line[1] = [Math.floor(line[1] / 2), Math.ceil(line[1] / 2)];
        found = true;
    }

    return found;
};

let result = parseLine(list.shift());
list.forEach((line) => {
    result = add(result, parseLine(line));
    let found = true;
    while (found) {
        const tmp = explode(result, 0, 0, 0, false);
        result = tmp.line;
        if (!tmp.found) found = split(result, false);
        console.log(JSON.stringify(result));
    }
    console.log(JSON.stringify(result));
});

console.log(result);
