const list = document.querySelector('pre').innerText.split('\n');
const pub1 = parseInt(list[0]);
let pub1Loop = 0;
const pub2 = parseInt(list[1]);
let pub2Loop = 0;
const subject = 7;

let found = 0;

let value = 1;
let times = 1;
while (found !== 2) {
    value = (value * subject) % 20201227;
    if (value === pub1) {
        found++;
        pub1Loop = times;
    }
    if (value === pub2) {
        found++;
        pub2Loop = times;
    }
    times++;
}
console.log({ pub1Loop, pub2Loop, subject });

let pub1Val = 1;
for (let i = 0; i < pub1Loop; i++) pub1Val = (pub1Val * pub2) % 20201227;
let pub2Val = 1;
for (let i = 0; i < pub2Loop; i++) pub2Val = (pub2Val * pub1) % 20201227;
console.log(pub1Val);
console.log(pub2Val);
