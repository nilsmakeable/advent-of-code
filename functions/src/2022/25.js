const input = document.body.innerText.split('\n');
const numbers =input.map(num => num.split('').reduce((n, d) => n*5 + (2 - "210-=".indexOf(d)), 0));
  
let sum = numbers.reduce((a, n) => a + n, 0);
const digits = [];
while (sum != 0) {
    sum += 2;
    digits.unshift("=-012"[sum % 5]);
    sum = Math.floor(sum / 5);
}

console.log(`first numberr: ${digits.join('')}`);
