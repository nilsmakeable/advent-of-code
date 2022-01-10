const list = document.querySelector('pre').innerText.split('\n');

const numbers = list[0].split(',');
let boardIndex = 0;
let boards = [];
let rowIndex = 0;
for (let i = 2; i < list.length; i++) {
    if (list[i] === '') {
        boardIndex++;
        rowIndex = 0;
    } else {
        if (boards[boardIndex] === undefined) {
            boards[boardIndex] = [];
            rowIndex = 0;
        }
        boards[boardIndex][rowIndex] = list[i]
            .split(' ')
            .filter((number) => number !== '')
            .map((number) => {
                return { [number]: false };
            });
    }
    rowIndex++;
}

let numberIndex = 0;
let winner = -1;
let boardCounts = [];
for (let i = 0; i < boards.length; i++) {
    boardCounts[i] = { rows: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }, cols: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } };
}
while (numbers.length > numberIndex && winner === -1) {
    const number = numbers[numberIndex];
    for (let i = 0; i < boards.length; i++) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const key = Object.keys(boards[i][y][x])[0];
                if (key === number) {
                    boardCounts[i].cols[y]++;
                    if (boardCounts[i].cols[y] === 5) {
                        winner = i;
                    }
                    boardCounts[i].rows[x]++;
                    if (boardCounts[i].rows[x] === 5) {
                        winner = i;
                    }
                    boards[i][y][x] = { [number]: true };
                }
            }
        }
    }
    if (winner === -1) numberIndex++;
}

let acc = 0;
for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        // eslint-disable-next-line no-loop-func
        Object.keys(boards[winner][y][x]).forEach((number) => {
            if (!boards[winner][y][x][number]) {
                acc += parseInt(number);
            }
        });
    }
}
console.log(`winner board ${winner}`);
console.log(`first number:${acc * numbers[numberIndex]}`);

// PART 2

boardIndex = 0;
boards = [];
rowIndex = 0;
for (let i = 2; i < list.length; i++) {
    if (list[i] === '') {
        boardIndex++;
        rowIndex = 0;
    } else {
        if (boards[boardIndex] === undefined) {
            boards[boardIndex] = [];
            rowIndex = 0;
        }
        boards[boardIndex][rowIndex] = list[i]
            .split(' ')
            .filter((number) => number !== '')
            .map((number) => {
                return { [number]: false };
            });
    }
    rowIndex++;
}

numberIndex = 0;
winner = -1;
let winnerCount = 0;
boardCounts = [];
for (let i = 0; i < boards.length; i++) {
    boardCounts[i] = { rows: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }, cols: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } };
}

while (numbers.length > numberIndex && winnerCount !== boards.length) {
    const number = parseInt(numbers[numberIndex]);
    for (let i = 0; i < boards.length; i++) {
        if (boards[i] !== true)
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (boards[i] !== true) {
                        const key = Object.keys(boards[i][y][x])[0];
                        if (parseInt(key) === number) {
                            boards[i][y][x] = { [number]: true };
                            boardCounts[i].cols[y]++;
                            if (boardCounts[i].cols[y] === 5) {
                                winner = i;
                                console.log(`${i} won`);
                                winnerCount++;
                                if (winnerCount !== boards.length) boards[i] = true;
                            } else {
                                boardCounts[i].rows[x]++;
                                if (boardCounts[i].rows[x] === 5) {
                                    winner = i;
                                    console.log(`${i} won`);
                                    winnerCount++;
                                    if (winnerCount !== boards.length) boards[i] = true;
                                }
                            }
                        }
                    }
                }
            }
    }
    if (winnerCount !== boards.length) numberIndex++;
}

acc = 0;
for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        // eslint-disable-next-line no-loop-func
        Object.keys(boards[winner][y][x]).forEach((number) => {
            if (!boards[winner][y][x][number]) {
                acc += parseInt(number);
            }
        });
    }
}
console.log(`secound number:${acc * numbers[numberIndex]}`);
