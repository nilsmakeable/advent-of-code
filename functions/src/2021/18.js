let list = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`.split('\n');
let result = list.shift();

result = '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]';
list = ['[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]'];
const add = (nr1, nr2) => {
    return `[${nr1},${nr2}]`;
};
const explode = (nr) => {
    const stack = [];
    let debth = 0;
    let exploded = false;
    for (let i = 0; i < nr.length && !exploded; i++) {
        if (nr[i] === '[') {
            debth++;
        }
        if (nr[i] === ']') {
            debth--;
        }
        if (debth === 5) {
            while (Number.isNaN(parseInt(nr[i]))) i++;
            let tmp = nr.substr(i - 1, nr.substr(i).indexOf(']') + 2);
            const x = tmp.substr(1, tmp.indexOf(',') - 1);
            const y = tmp.substr(tmp.indexOf(',') + 1, tmp.length - tmp.indexOf(']'));
            nr = nr.replace(tmp, '0');
            console.log(tmp);
            tmp = nr.split('');
            let done = false;
            for (let n = i - 1; n > 0 && !done; n--) {
                if (!['[', ']', ','].includes(tmp[n])) {
                    tmp[n] = parseInt(tmp[n]) + parseInt(x);
                    done = true;
                }
            }
            done = false;
            for (let n = i + 1; n < tmp.length && !done; n++) {
                if (!['[', ']', ','].includes(tmp[n])) {
                    tmp[n] = parseInt(tmp[n]) + parseInt(y);
                    done = true;
                }
            }
            debth--;
            nr = tmp.join('');
            exploded = true;
        }
    }
    return nr;
};

const split = (nr) => {
    let lastNr = false;
    let found = false;
    for (let i = 0; i < nr.length && !found; i++) {
        if (!Number.isNaN(parseInt(nr[i]))) {
            if (lastNr) {
                const x = nr.substr(i - 1, 2);
                console.log(x);
                found = true;
                nr = `${nr.substr(0, i - 1)}[${Math.floor(parseInt(x) / 2)},${Math.ceil(parseInt(x) / 2)}]${nr.substr(i + 1)}`;
            }
            lastNr = true;
        } else lastNr = false;
    }
    return nr;
};

list.forEach((number) => {
    let preNumber = result;
    result = add(result, number);
    let count = 0;
    while (result !== preNumber && count < 1000) {
        preNumber = result;
        count++;
        result = explode(result);
        if (preNumber === result) result = split(result);
        console.log(result);
    }
    console.log(result);
});
