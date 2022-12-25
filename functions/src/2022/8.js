const list = document.querySelector('pre').innerText.split('\n');
list.pop();

const map = {};

list.forEach((line,index) => {
    map[index] = line.split('').map((x)=>parseInt(x));
});

let acc = 0;

Object.keys(map).forEach((key,y) => {
    map[y].forEach((height,x) => {
        let found = true;
        for(let i = y - 1; i >= 0; i--) {
            if(map[i][x] >= height) {
                found = false;
            }
        }
        if(found) acc++;
        else{
            found = true;
            for(let i = y + 1; i < Object.keys(map).length; i++) {
                if(map[i][x] >= height) found = false;
            }
            if(found) acc++;
            else{
                found = true;
                for(let i = x - 1; i >= 0; i--) {
                    if(map[y][i] >= height) found = false;
                }
                if(found) acc++;
                else{
                    found = true;
                    for(let i = x + 1; i < map[y].length; i++) {
                        if(map[y][i] >= height) found = false;
                    }
                    if(found) acc++;
                }
            }
        }
    });
});

console.log(`first numberr: ${acc}`);

acc = 0;

for(let y = 1; y < Object.keys(map).length - 1; y++) {
   for(let x = 1; x < map[y].length - 1; x++) {
        const height = map[y][x];
        let cur = 1;
        for(let i = y - 1; i >= 0; i--) {
            if(map[i][x] >= height || i === 0){ 
                cur *= y-i;
                break;
            }
        }
        for(let i = y + 1; i < Object.keys(map).length; i++) {
            if(map[i][x] >= height || i === Object.keys(map).length - 1){
                cur *= i-y;
                break;
            }
        }
        for(let i = x - 1; i >= 0; i--) {
            if(map[y][i] >= height || i === 0){
                 cur *= x-i;
                 break;
            }
        }
        for(let i = x + 1; i < map[y].length; i++) {
            if(map[y][i] >= height || i === map[y].length - 1){
                 cur *= i-x;
                 break;
            }
        }
        acc = Math.max(acc,cur);
    }
}

console.log(`secound number: ${acc}`);
