const list = document.querySelector('pre').innerText.split('\n');

const check = (left,right) => {
    if(right === undefined) return -1;
    if(!Array.isArray(left)) left = [left];
    if(!Array.isArray(right)) right = [right];
    let success = 0;
    for(let i=0;i<left.length;i++){
        if(success === 0){
            if(Array.isArray(left[i]) || Array.isArray(right[i])) success = check(left[i],right[i]);
            else if(Number.isInteger(left[i]) && Number.isInteger(right[i]) && left[i] !== right[i]){
                success = (right[i] === undefined || left[i] < right[i]) ? 1 : -1;
            }else if (left[i] !== undefined && right[i] === undefined) return -1;
        }
    }
    if(success === 0 && left.length < right.length) success = 1;
    return success;
}
let acc = 0;
let index=1;
for(let i=2;i<list.length;i=i+3){
    const left = JSON.parse(list[i-2]);
    const right = JSON.parse(list[i-1]);
    const test = check(left,right);
    if(test === 1) acc += index;
    index++;
}

console.log(`first number: ${acc}`);

const input = list.filter((row) => row !== '').map((row) => JSON.parse(row));
input.push([[2]]);
input.push([[6]]);

input.sort((a,b) => check(b,a));
acc = 1;
input.forEach((row,index) => {
    if(JSON.stringify(row) === '[[2]]') acc *= index+1;
    if(JSON.stringify(row) === '[[6]]') acc *= index+1;
});
console.log(`secound number: ${acc}`);

