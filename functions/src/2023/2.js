const list = document.querySelector('pre').innerText.trim().split('\n');

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

let agg = 0;
let agg2 = 0;

list.forEach((game) => {
    const gameId = parseInt(game.split(': ')[0].replace('Game ', ''));
    const hints = game.split(': ')[1].split(';');
    let curMaxRed = 0;
    let curMaxGreen = 0;
    let curMaxBlue = 0;
    hints.forEach((hint) => {
        const parts = hint.split(', ');
        parts.forEach((part) => {
            switch (part.replace(/\d/g, '').trim()) {
                case 'red':
                    curMaxRed = Math.max(curMaxRed, parseInt(part.replace(/[a-z]/g, '')));
                    break;
                case 'green':
                    curMaxGreen = Math.max(curMaxGreen, parseInt(part.replace(/[a-z]/g, '')));
                    break;
                case 'blue':
                    curMaxBlue = Math.max(curMaxBlue, parseInt(part.replace(/[a-z]/g, '')));
                    break;
                default:
                    console.log('error', part.replace(/\d/g, '').trim());
            }
        });
    });
    if (curMaxRed <= maxRed && curMaxGreen <= maxGreen && curMaxBlue <= maxBlue) {
        agg += gameId;
    }
    agg2 += curMaxRed * curMaxBlue * curMaxGreen;
});

console.log(`first answer: ${agg}`);
console.log(`second answer: ${agg2}`);
