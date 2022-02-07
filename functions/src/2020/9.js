let list = document.querySelector("pre").innerText.split("\n");
const preampleLength = 25;
let found = false;
let number = 0;
let index = 25;
while(!found){
    number = list[index];
    let candidate = true;
    for(let i = index-preampleLength; i < index && candidate;i++){
        for(let l = index-preampleLength; l < index && candidate; l++){
            if(i!==l){
                if(parseInt(list[i])+parseInt(list[l]) === parseInt(number)) candidate = false;
            }
        }
    }
    if(candidate){ 
        found = true;
        console.log(`part 1 number:`+number);
    }else index++;
}


//Part 2
let start = 0;
let end = 1;
let acc = parseInt(list[start])+parseInt(list[end]);

while(parseInt(acc) != parseInt(number)){
    if(parseInt(acc)+parseInt(list[end+1]) > parseInt(number)){
        acc = parseInt(acc) - parseInt(list[start]);
        start++;
    }else{
        acc = parseInt(acc) + parseInt(list[end+1]);
        end++;
    }
}
console.log(`start: ${start}, end:${end}`);

let smallest = parseInt(number) +1;
let largest = -1;
for(let i = start; i < end;i++){
    if(list[i] > largest){largest = list[i]}
    if(list[i] < smallest){smallest = list[i]}
}
console.log(parseInt(smallest) + parseInt(largest));