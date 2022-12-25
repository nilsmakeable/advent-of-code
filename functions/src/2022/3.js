const list = document.querySelector('pre').innerText.split('\n');
list.pop();

let acc = 0;
let foundOnThis = false;
list.forEach((line) => {
    const b1 = line.substring(0,line.length/2).split('');
    const b2 = line.substring(line.length/2).split('');
    foundOnThis = false;
    b1.forEach((c) => {
        if (!foundOnThis && b2.includes(c)) {
            foundOnThis = true;
            if(c.toLowerCase() === c) acc += c.charCodeAt(0)-96;
            else acc += c.charCodeAt(0)-38;
        }
    });
});

console.log(`first numberr: ${acc}`);

acc = 0;

for(let i = 0; i < list.length; i=i+3) {
    const r1 = list[i].split('');
    const r2 = list[i+1].split('');
    const r3 = list[i+2].split('');
    foundOnThis = false;
    r1.forEach((c1) => {
        if(!foundOnThis && r2.includes(c1) && r3.includes(c1)) {
            foundOnThis=true;
            if(c1.toLowerCase() === c1) acc += c1.charCodeAt(0)-96;
            else acc += c1.charCodeAt(0)-38;
        }
    });
}

console.log(`secound number: ${acc}`);
