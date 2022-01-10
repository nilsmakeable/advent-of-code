const list = document.querySelector('pre').innerText.split('\n');
list.pop();

/**
    0000
   1    2
   1    2
    3333
   4    5
   4    5
    6666
0 = 6 does not have 3
2 = 5 has 5
3 = 5 does not have 5
5 = 5 does not have 2
6 = 6 does not have 2
9 = 6 has 2
*/
let total = 0;
list.forEach((line) => {
    const data = line.split(' | ');
    const map = [];
    map[5] = [];
    map[6] = [];
    const convert = {};
    data[0].split(' ').forEach((input) => {
        input = input.split('').sort().join('');
        if (input.length === 5 || input.length === 6) map[input.length].push(input);
        else map[input.length] = input;
        if (input.length === 2) convert[input] = 1;
        if (input.length === 3) convert[input] = 7;
        if (input.length === 4) convert[input] = 4;
        if (input.length === 7) convert[input] = 8;
    });
    if (map[5][0].replace(new RegExp(`[${map[5][1]}]`, 'g'), '').length + map[5][0].replace(new RegExp(`[${map[5][2]}]`, 'g'), '').length === 2) {
        convert[map[5][0]] = 3;
        map[5].splice(0, 1);
    } else if (map[5][1].replace(new RegExp(`[${map[5][0]}]`, 'g'), '').length + map[5][1].replace(new RegExp(`[${map[5][2]}]`, 'g'), '').length === 2) {
        convert[map[5][1]] = 3;
        map[5].splice(1, 1);
    } else if (map[5][2].replace(new RegExp(`[${map[5][0]}]`, 'g'), '').length + map[5][2].replace(new RegExp(`[${map[5][1]}]`, 'g'), '').length === 2) {
        convert[map[5][2]] = 3;
        map[5].splice(2, 1);
    }
    if (map[5][0].replace(new RegExp(`[${map[4]}]`, 'g'), '').length === 2) {
        convert[map[5][0]] = 5;
        convert[map[5][1]] = 2;
    } else {
        convert[map[5][0]] = 2;
        convert[map[5][1]] = 5;
    }
    if (map[6][0].replace(new RegExp(`[${map[4]}]`, 'g'), '').length === 2) {
        convert[map[6][0]] = 9;
        map[6].splice(0, 1);
    } else if (map[6][1].replace(new RegExp(`[${map[4]}]`, 'g'), '').length === 2) {
        convert[map[6][1]] = 9;
        map[6].splice(1, 1);
    } else {
        convert[map[6][2]] = 9;
        map[6].splice(2, 1);
    }
    if (map[6][0].replace(new RegExp(`[${map[2]}]`, 'g'), '').length === 5) {
        convert[map[6][0]] = 6;
        convert[map[6][1]] = 0;
    } else {
        convert[map[6][0]] = 0;
        convert[map[6][1]] = 6;
    }
    let acc = '';
    data[1].split(' ').forEach((input) => {
        acc += `${convert[input.split('').sort().join('')]}`;
    });
    console.log(acc);
    total += parseInt(acc);
});
console.log(`secound number: ${total}`);
