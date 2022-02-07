let list = document.querySelector("pre").innerText.split("\n");
let replaceIndex = {};
let index = 0;
let acc = 0;
while(index < list.length-1){
    acc = 0;
    index = 0
    let visitedIndex = {};
    let replaced = false;

    while(visitedIndex[index] === undefined) {
        visitedIndex[index] = true;
        const parts = list[index].split(" ");
        const opp = parts[0];
        let val = parseInt(parts[1]);
        if(!replaced && ['nop','jmp'].includes(opp) && replaceIndex[index]===undefined){
            console.log('replace index:'+index);
            replaceIndex[index] = true;
            replaced=true;
            switch(opp) {
                case 'jmp':
                    index++;
                break;
                case 'nop':
                    index = index + val;
                break;
            }
        }else
            switch(opp) {
                case 'acc':
                    acc += val;
                case 'nop':
                    index++;
                break;
                case 'jmp':
                    index = index + val;
                break;
            }
    }
}

console.log('acc is:'+acc);