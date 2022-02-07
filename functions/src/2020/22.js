let p1stack = [14, 29, 25, 17, 13, 50, 33, 32, 7, 37, 26, 34, 46, 24, 3, 28, 18, 20, 11, 1, 21, 8, 44, 10, 22];
let p2stack = [5, 38, 27, 15, 45, 40, 43, 30, 35, 9, 48, 12, 16, 47, 42, 4, 2, 31, 41, 39, 23, 19, 36, 49, 6];

while (p1stack.length > 0 && p2stack.length > 0) {
    if (p1stack[0] > p2stack[0]) {
        p1stack.push(p1stack[0]);
        p1stack.push(p2stack[0]);
    } else {
        p2stack.push(p2stack[0]);
        p2stack.push(p1stack[0]);
    }
    p1stack.shift();
    p2stack.shift();
}
let winner = p1stack.length === 0 ? p2stack : p1stack;
let acc = 0;
for (let i = 0; i < winner.length; i++) {
    acc += (winner.length - i) * winner[i];
}
console.log(acc);

// Part2
p1stack = [14, 29, 25, 17, 13, 50, 33, 32, 7, 37, 26, 34, 46, 24, 3, 28, 18, 20, 11, 1, 21, 8, 44, 10, 22];
p2stack = [5, 38, 27, 15, 45, 40, 43, 30, 35, 9, 48, 12, 16, 47, 42, 4, 2, 31, 41, 39, 23, 19, 36, 49, 6];

const game = (list1, list2) => {
    let gamewinner = 0;
    const prevGames = [];
    while (gamewinner === 0) {
        /* console.log(JSON.stringify(list1));
        console.log(JSON.stringify(list2));
        console.log(''); */
        const key = `${list1.join(',')}&&${list2.join(',')}`;
        if (prevGames.includes(key)) {
            gamewinner = 1;
            // console.log({ prevGames });
        } else {
            prevGames.push(`${list1.join(',')}&&${list2.join(',')}`);
            let roundWinner = 0;
            if (list1.length === 1 || list2.length === 1 || list2.length - 1 < list2[0] || list1.length - 1 < list1[0]) {
                roundWinner = list1[0] > list2[0] ? 1 : 2;
            } else {
                // console.log('recGame');
                roundWinner = game(list1.slice(1, list1[0] + 1), list2.slice(1, list2[0] + 1)).winner;
            }
            // console.log({ roundWinner });
            if (roundWinner === 1) {
                list1.push(list1[0]);
                list1.push(list2[0]);
            } else {
                list2.push(list2[0]);
                list2.push(list1[0]);
            }
            list1.shift();
            list2.shift();
        }
        if (list1.length === 0) gamewinner = 2;
        if (list2.length === 0) gamewinner = 1;
    }
    return { winner: gamewinner, list: gamewinner === 1 ? list1 : list2 };
};

winner = game(p1stack, p2stack).list;
acc = 0;
for (let i = 0; i < winner.length; i++) {
    acc += (winner.length - i) * winner[i];
}
console.log(acc);
