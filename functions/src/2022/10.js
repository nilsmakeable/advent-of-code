const list = document.querySelector('pre').innerText.split('\n');
let answer2 = {0:[]};
let linenr = 0;
let cycle = 0;
let x = 1;
let acc = 0;
list.forEach((line) => {
    let cycles = 1;
    let xAdd = 0;
    if(line.indexOf('addx') !== -1){
        cycles = 2;
        xAdd = parseInt(line.split(' ')[1]);
        xAdd = parseInt(line.split(' ')[1]);
    }
    for(;cycles>0;cycles--) {
        if((cycle%40) >= x-1 && (cycle%40) <= x+1) answer2[linenr].push('#');
        else answer2[linenr].push('.');
        cycle++;
        if(cycle === 20 || cycle > 40 && (cycle-20)%40===0) acc += cycle*x;

        if(cycle%40 === 0){
            linenr++;
            answer2[linenr] = [];
        }
    }
    x += xAdd;
});

console.log(`first number: ${acc}`);
console.log(`secound number:`);
Object.keys(answer2).forEach((line) => {
    console.log(answer2[line].join(''));
});

