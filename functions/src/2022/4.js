const list = document.querySelector('pre').innerText.split('\n');
list.pop();

let acc = 0;
list.forEach((line) => {
    const parts = line.split(',');
    const s1 = parseInt(parts[0].split('-')[0]);
    const e1 = parseInt(parts[0].split('-')[1]);
    const s2 = parseInt(parts[1].split('-')[0]);
    const e2 = parseInt(parts[1].split('-')[1]);

    if(s1 <= s2 && e1 >= e2 || s1 >= s2 && e1 <= e2) acc++;

});

console.log(`first numberr: ${acc}`);

acc = 0;
list.forEach((line) => {
    const parts = line.split(',');
    const s1 = parseInt(parts[0].split('-')[0]);
    const e1 = parseInt(parts[0].split('-')[1]);
    const s2 = parseInt(parts[1].split('-')[0]);
    const e2 = parseInt(parts[1].split('-')[1]);

    if(s1 >= s2 && s1 <= e2 || e1 >= s2 && e1 <= e2) acc++;
    else if(s2 >= s1 && s2 <= e1 || e2 >= s1 && e2 <= e1) acc++;
    else if(e1 >= s2 && e1 <= e2 || s1 >= s2 && s1 <= e2) acc++;
    else if(e2 >= s1 && e2 <= e1 || s2 >= s1 && s2 <= e1) acc++;

});

console.log(`secound number: ${acc}`);
