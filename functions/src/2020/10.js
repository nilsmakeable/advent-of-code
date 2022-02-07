let list = document.querySelector("pre").innerText.split("\n");
let oneDiff = 1;
let twoDiff = 0;
let threeDiff = 1;
let spanCount = {};
list.sort((a,b)=>a-b);

for(let i = 0;i<list.length-1;i++){
    if(list[i+1]-list[i] == 1)oneDiff++;
    if(list[i+1]-list[i] == 2)twoDiff++;
    if(list[i+1]-list[i] == 3)threeDiff++;
}
console.log({oneDiff,twoDiff,threeDiff});
console.log(`first number: `+parseInt(oneDiff)*parseInt(threeDiff));

let last = list.pop();
list = ['0'].concat(list,[last,parseInt(last)+3]);
let seqLen = 1;
for(let i = 0;i<list.length-1;i++){
    if(list[i+1]-list[i] == 1){
        seqLen++;
    }else{
        if(spanCount[seqLen] === undefined) spanCount[seqLen] = 0;
        spanCount[seqLen]++;
        seqLen = 1;
    }
}
if(spanCount[seqLen] === undefined) spanCount[seqLen] = 0;
spanCount[seqLen]++;
let total = 1;
/*
span 2 = 1;  1,4,5,8 => 1,4,5,8
span 3 = 2;  1,4,5,6,9 => 1,4,5,6,9 - 1,4,6,9
span 4 = 4;  1,4,5,6,7,10 => 1,4,5,6,7,10 - 1,4,5,7,10 - 1,4,6,7,10 - 1,4,7,10 
span 5 = 7;  1,4,5,6,7,8,11 => 1,4,5,6,7,8,11 - 1,4,6,7,8,11  - 1,4,5,8,11 - 1,4,6,8,11 - 1,4,7,8,11 - 1,4,5,7,8,11 - 1,4,5,6,8,11 
span 6 = 12*/
Object.keys(spanCount).forEach((len)=>{
    let inc = 1;
    if(len == 3) inc = 2;
    if(len == 4) inc = 4;
    if(len == 5) inc = 7;
    if(len > 5) console.log("not here???");
    total = total * Math.pow(inc,spanCount[len]);
});
console.log(total);