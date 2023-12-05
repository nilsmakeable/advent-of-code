const list = document.querySelector('pre').innerText.trim().split('\n');

let acc = 0;
const numberOfCards = list.map((row) => 1);

const getNumberOfwinners = (row) => {
    const lists = row.split(': ')[1].split(' | ');
    const winningNumbers = lists[0]
        .split(' ')
        .filter((x) => x.trim() !== '')
        .map((x) => parseInt(x));
    const numbers = lists[1]
        .split(' ')
        .filter((x) => x.trim() !== '')
        .map((x) => parseInt(x));
    return numbers.filter((x) => winningNumbers.includes(x)).length;
};

list.forEach((row, index) => {
    const winners = getNumberOfwinners(row);
    if (winners > 0) {
        acc += 1 * (2 ** winners - 1);
        for (let i = 1; i <= winners; i++) numberOfCards[index + i] += numberOfCards[index];
    }
});

console.log(`Part 1: ${acc}`);
console.log(`Part 2: ${numberOfCards.reduce((a, b) => a + b, 0)}`);
