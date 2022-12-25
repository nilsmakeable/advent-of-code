let part1 = (part2 = 0)
const input = document.querySelector('pre').innerText.trim().split('\n');
 
function decrypt(source, c = 1) {
    const buf = [...source]
    while (c--) {
        for (const n of source) {
            const index = buf.indexOf(n)
            buf.splice(index, 1)
            buf.splice((index + n.num) % buf.length, 0, n)
        }
    }
    const zero = buf.findIndex(({ num }) => num === 0)
    const numbers = [1000, 2000, 3000].map((k) => buf[(zero + k) % buf.length].num)
    return numbers.reduce((s, a) => s + a, 0)
}
 
console.log(`first number: ${decrypt(input.map((line) => ({ num: Number(line) })))}`);
console.log(`secound number: ${decrypt(input.map((line) => ({ num: Number(line) * 811589153 })), 10)}`);

