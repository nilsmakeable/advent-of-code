const list = document.querySelector('pre').innerText.split('\n\n');

let monkeys = {};

list.forEach((monkey,index) => {
    monkey = monkey.split('\n');
    const items = monkey[1].split(', ');
    items[0] = items[0].split(' ').pop();
    monkeys[index] = {
        items: items.map((item) => parseInt(item)),
        opperator: monkey[2].indexOf('*') !== -1 ? '*' : '+',
        oppNum: parseInt(monkey[2].split(' ').pop()),
        opp: (num) => {
            curMonkey.inspections++;
            if(Number.isNaN(curMonkey.oppNum)) return Math.floor((num*num)/3);
            switch(curMonkey.opperator){
                case '*':
                    return Math.floor((num * curMonkey.oppNum) / 3);
                case '+':
                    return Math.floor((num + curMonkey.oppNum) / 3);
            }
        },
        testNr: parseInt(monkey[3].split(' ').pop()),
        test: (num) => {
            return num % curMonkey.testNr === 0 ? curMonkey.t : curMonkey.f; 
        },
        t: parseInt(monkey[4].split(' ').pop()),
        f: parseInt(monkey[5].split(' ').pop()),
        inspections: 0,
        run: () => {
            let items = curMonkey.items;
            curMonkey.items = [];
            items.forEach((item) => {
                const newWorry = curMonkey.opp(item);
                monkeys[curMonkey.test(newWorry)].items.push(newWorry);
            });
        }
    }
});

let curMonkey = null;
for(let i=0;i<20;i++){
    Object.keys(monkeys).forEach((monkey,index) => {
        curMonkey = monkeys[monkey];
        curMonkey.run();
    });
}
let inspections = Object.values(monkeys).map((monkey) => monkey.inspections).sort((a,b) => b-a);
console.log(`first number: ${inspections[0]*inspections[1]}`);

monkeys = {};
let primeMult = 1;

list.forEach((monkey,index) => {
    monkey = monkey.split('\n');
    const items = monkey[1].split(', ');
    items[0] = items[0].split(' ').pop();
    monkeys[index] = {
        items: items.map((item) => parseInt(item)),
        opperator: monkey[2].indexOf('*') !== -1 ? '*' : '+',
        oppNum: parseInt((monkey[2].split(' ').pop())),
        opp: (num) => {
            curMonkey.inspections++;
            if(Number.isNaN(curMonkey.oppNum)) return (num*num)%primeMult;
            switch(curMonkey.opperator){
                case '*':
                    return (num * curMonkey.oppNum)%primeMult;
                case '+':
                    return (num + curMonkey.oppNum)%primeMult;
            }
        },
        testNr: parseInt((monkey[3].split(' ').pop())),
        test: (num) => {
            return (num % curMonkey.testNr) === 0 ? curMonkey.t : curMonkey.f; 
        },
        t: parseInt(monkey[4].split(' ').pop()),
        f: parseInt(monkey[5].split(' ').pop()),
        inspections: 0,
        run: () => {
            let items = curMonkey.items;
            curMonkey.items = [];
            items.forEach((item) => {
                const newWorry = (curMonkey.opp(item));
                monkeys[curMonkey.test(newWorry)].items.push(newWorry);
            });
        }
    }
    primeMult *= monkeys[index].testNr;
});
for(let i=0;i<10000;i++){
    Object.keys(monkeys).forEach((monkey,index) => {
        curMonkey = monkeys[monkey];
        curMonkey.run();
    });
}

inspections = Object.values(monkeys).map((monkey) => monkey.inspections).sort((a,b) => b-a);
console.log(`secound number: ${inspections[0]*inspections[1]}`);

