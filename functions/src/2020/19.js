console.log('Start');
const testInput = $('pre').innerText.trimEnd();
const input = testInput.split('\n\n').map((a) => a.split('\n'));
const messages = input[1];
let rules = [];
input[0].forEach((a) => (rules[a.split(': ')[0]] = a.split(': ')[1]));
rules = rules.map((a) => a.replaceAll('"', ''));

function expandAll(str) {
    while (str.match(/\d/)) {
        let expList = str.match(/(?<!\d)\d+(?!\d)/g) || [];
        expList = expList.filter((a, i, ar) => ar.findIndex((b) => b == a) == i);
        expList.forEach((exp) => {
            str = str.replaceAll(new RegExp(`(?<!\\d)${exp}(?!\\d)`, 'g'), rules[exp].includes('|') ? `(${rules[exp]})` : rules[exp]);
        });
    }
    return str.replaceAll(' ', '');
}

// 0: 8 11
// 8: 42
// 11: 42 31
// 0:= 42{2} 31
const rule42 = expandAll('42');
console.log('Expanded 42');
const rule31 = expandAll('31');
console.log('Expanded 31');
let loopRule = new RegExp(`^${rule42}{2}${rule31}$`);
console.log(`Answer 1: ${messages.filter((a) => loopRule.test(a)).length}`);

// 0: 8 11
// 8: 42 | 42 8
// 11: 42 31 | 42 11 31
// 0:= 42+ 42{i} 31{i}
const valid = [];
for (let i = 1; i < 5; i++) {
    loopRule = new RegExp(`^${rule42}+${rule42}{${i}}${rule31}{${i}}$`);
    valid.push(...messages.filter((a) => !valid.includes(a) && loopRule.test(a)));
}
console.log(`Answer 2: ${valid.length}`);
