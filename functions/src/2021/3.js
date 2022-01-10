const list = document.querySelector('pre').innerText.split('\n');
const zeroes = [];
const ones = [];

for (let i = 0; i < list[0].split('').length; i++) {
    zeroes[i] = 0;
    ones[i] = 0;
}
list.forEach((row) => {
    for (let i = 0; i < list[0].split('').length; i++) {
        if (parseInt(row.split('')[i]) === 1) ones[i]++;
        else zeroes[i]++;
    }
});

let gamma = '';
let epsilon = '';

for (let i = 0; i < list[0].split('').length; i++) {
    if (zeroes[i] > ones[i]) {
        gamma += '0';
        epsilon += '1';
    } else {
        gamma += '1';
        epsilon += '0';
    }
}
console.log(`first number: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);
const purge = (list, i, val) => {
    let zeroes = 0;
    let ones = 0;
    list.forEach((row) => {
        if (parseInt(row.split('')[i]) === 1) ones++;
        else zeroes++;
    });
    const keep = zeroes - ones == 0 || ones - zeroes > 0 ? (val === 1 ? 1 : 0) : val === 1 ? 0 : 1;
    list = list.filter((row) => {
        return parseInt(row[i]) === keep;
    });
    // console.log({ones,zeroes,keep,val,list});
    return list;
};

let oxyList = document.querySelector('pre').innerText.split('\n');
for (let i = 0; i < oxyList[0].split('').length && oxyList.length !== 1; i++) {
    oxyList = purge(oxyList, i, 1);
}
console.log(`oxy:${oxyList[0]}`);
let co2List = document.querySelector('pre').innerText.split('\n');
for (let i = 0; i < co2List[0].split('').length && co2List.length !== 1; i++) {
    co2List = purge(co2List, i, 0);
}
console.log(`co2:${co2List[0]}`);

console.log(`secound number:${parseInt(oxyList[0], 2) * parseInt(co2List[0], 2)}`);
