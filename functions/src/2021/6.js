const list = document.querySelector('pre').innerText.split(',');
let fishs = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

list.forEach((fish) => {
    fishs[parseInt(fish)]++;
});

console.log(fishs);

const nextDay = (prev) => {
    return { 0: prev[1], 1: prev[2], 2: prev[3], 3: prev[4], 4: prev[5], 5: prev[6], 6: prev[7] + prev[0], 7: prev[8], 8: prev[0] };
};
const times = 18;
for (let i = 0; i < times; i++) {
    fishs = nextDay(fishs);
}
const total = fishs[0] + fishs[1] + fishs[2] + fishs[3] + fishs[4] + fishs[5] + fishs[6] + fishs[7] + fishs[8];
console.log(`first number: ${total}`);
