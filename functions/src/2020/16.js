const list = document.querySelector('pre').innerText.split('\n');

const rules = [];
const matchFilter = {};
let myTicket = '';
let acc = 0;
const multRules = [];

for (let i = 0; i < list.length; i++) {
    if (list[i] === 'your ticket:') {
        myTicket = list[i + 1].split(',');
        i++;
    }
    if (myTicket !== '') {
        if (list[i] !== '' && list[i] !== 'nearby tickets:') {
            const tmp = list[i].split(',');
            let invalid = false;
            const ruleMatch = {};
            for (let n = 0; n < tmp.length; n++) {
                const val = parseInt(tmp[n]);
                const match = rules.filter(
                    (rule) => (val >= parseInt(rule[0].split('-')[0]) && val <= parseInt(rule[0].split('-')[1])) || (val >= parseInt(rule[1].split('-')[0]) && val <= parseInt(rule[1].split('-')[1]))
                );
                if (match.length === 0) {
                    acc += val;
                    invalid = true;
                    break;
                }
                ruleMatch[n] = match;
            }
            if (!invalid) {
                Object.keys(ruleMatch).forEach((key) => {
                    if (matchFilter[key] === undefined || matchFilter[key].size > 1) {
                        if (matchFilter[key] === undefined) matchFilter[key] = new Set(ruleMatch[key].map((val) => `${val[0]} or ${val[1]}`));
                        else matchFilter[key] = new Set(ruleMatch[key].map((val) => `${val[0]} or ${val[1]}`).filter((k) => matchFilter[key].has(k)));
                        if (matchFilter[key].size === 1) {
                            const index = matchFilter[key].entries().next().value[0];
                            const queue = [];
                            queue.push(index);
                            while (queue.length > 0) {
                                const cur = queue.pop();
                                Object.keys(matchFilter).forEach((k) => {
                                    if (matchFilter[k].size !== 1) {
                                        matchFilter[k].delete(cur);
                                        if (matchFilter[k].size === 1) {
                                            queue.push(matchFilter[k].entries().next().value[0]);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    } else if (list[i] !== '') {
        if (list[i].indexOf('departure') !== -1) {
            multRules.push(list[i].split(': ')[1]);
        }
        rules.push(list[i].split(': ')[1].split(' or '));
    }
}
console.log(acc);
acc = 1;
multRules.forEach((rule) => {
    Object.keys(matchFilter).forEach((key) => {
        if (matchFilter[key].has(rule)) {
            acc *= parseInt(myTicket[key]);
        }
    });
});
console.log(acc);
