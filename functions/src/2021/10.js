const list = document.querySelector('pre').innerText.split('\n');
let acc = 0;
let accIncomplete = 0;
let stack = [];
let found = false;
const map = { '{': '}', '[': ']', '(': ')', '<': '>' };
const score = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const scoreIncomplete = { ')': 1, ']': 2, '}': 3, '>': 4 };
const scores = [];
list.forEach((line) => {
    stack = [];
    found = false;
    line.split('').forEach((char) => {
        if (!found) {
            if (['(', '{', '<', '['].includes(char)) stack.push(map[char]);
            else {
                const match = stack.pop();
                if (match !== char) {
                    found = true;
                    acc += score[char];
                }
            }
        }
    });
    // part 2
    if (!found) {
        accIncomplete = 0;
        while (stack.length > 0) accIncomplete = accIncomplete * 5 + scoreIncomplete[stack.pop()];
        scores.push(accIncomplete);
    }
});
console.log(acc);

// part 2
scores.sort((a, b) => a - b);
console.log(scores[Math.round(scores.length / 2)]);
