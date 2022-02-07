let list = document.querySelector("pre").innerText.split("\n");
list.pop();
let map = {};
for(let y = 0; y<list.length;y++){
    map[y] = {};
    let row = list[y].split('');
    for(let x = 0; x<row.length;x++)
        map[y][x] = row[x];
}
let changeMap = JSON.parse(JSON.stringify(map));
let changes = true;
let occupied = 0;
//. floor
//# occupied 
//L free
/*If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change. adjacency = all seats around, op,down,left,right,diagonals*/
while(changes){
    console.log(`ping, occ:${occupied}`);
    changes = false;
    occupied = 0;
    Object.keys(map).forEach((y)=>{
        y = parseInt(y);
        Object.keys(map[y]).forEach((x)=>{
            x = parseInt(x);
            if(map[y][x]==="L"){

                /*console.log(`
                ${map[y-1] !== undefined  && map[y-1][x-1] !== undefined ? map[y-1][x-1]:''}${map[y-1] !== undefined  ? map[y-1][x] : ''}${map[y-1] !== undefined  && map[y-1][x+1] !== undefined ? map[y-1][x+1]:''}
                ${map[y] !== undefined  && map[y][x-1] !== undefined ? map[y][x-1]:''}${map[y] !== undefined  ? map[y][x] : ''}${map[y] !== undefined  && map[y][x+1] !== undefined ? map[y][x+1]:''}
                ${map[y+1] !== undefined  && map[y+1][x-1] !== undefined ? map[y+1][x-1]:''}${map[y+1] !== undefined && map[y+1] !== undefined ? map[y+1][x] : ''}${map[y+1] !== undefined  && map[y+1][x+1] !== undefined ? map[y+1][x+1]:''}
                `);*/
                if((map[y-1]    == undefined || map[y-1][x] !== "#") &&
                   (map[y-1]    == undefined || map[y-1][x-1] == undefined || map[y-1][x-1] !== "#") &&
                   (map[y-1]    == undefined || map[y-1][x+1] == undefined || map[y-1][x+1] !== "#") &&
                   (map[y+1]    == undefined || map[y+1][x-1] == undefined || map[y+1][x-1] !== "#") &&
                   (map[y+1]    == undefined || map[y+1][x] !== "#") &&
                   (map[y+1]    == undefined || map[y+1][x+1] == undefined ||map[y+1][x+1] !== "#") &&
                   (map[y][x-1] == undefined || map[y][x-1] !== "#") &&
                   (map[y][x+1] == undefined || map[y][x+1] !== "#") ){
                 //   console.log('L true\n');
                    changeMap[y][x] = '#';
                    changes = true;
                }else{
                  //  console.log('L false\n');
                }
            }
            if(map[y][x]==="#"){
                occupied++;
                let count = 0;
                /*console.log(`
                ${map[y-1] !== undefined  && map[y-1][x-1] !== undefined ? map[y-1][x-1]:''}${map[y-1] !== undefined  ? map[y-1][x] : ''}${map[y-1] !== undefined  && map[y-1][x+1] !== undefined ? map[y-1][x+1]:''}
                ${map[y] !== undefined  && map[y][x-1] !== undefined ? map[y][x-1]:''}${map[y] !== undefined  ? map[y][x] : ''}${map[y] !== undefined  && map[y][x+1] !== undefined ? map[y][x+1]:''}
                ${map[y+1] !== undefined  && map[y+1][x-1] !== undefined ? map[y+1][x-1]:''}${map[y+1] !== undefined  ? map[y+1][x] : ''}${map[y+1] !== undefined  && map[y+1][x+1] !== undefined ? map[y+1][x+1]:''}
                `);*/
                if(map[y-1] != undefined && map[y-1][x] == "#") count ++;
                if(map[y-1] != undefined && map[y-1][x-1] != undefined && map[y-1][x-1] == "#") count ++;
                if(map[y-1] != undefined && map[y-1][x+1] != undefined && map[y-1][x+1] == "#") count ++;
                if(map[y+1] != undefined && map[y+1][x-1] != undefined && map[y+1][x-1] == "#") count ++;
                if(map[y+1] != undefined && map[y+1][x] != undefined && map[y+1][x] == "#") count ++;
                if(map[y+1] != undefined && map[y+1][x+1] != undefined && map[y+1][x+1] == "#") count ++;
                if(map[y][x+1] != undefined && map[y][x+1] == "#") count ++;
                if(map[y][x-1] != undefined && map[y][x-1] == "#" )count ++;
                if(count>3){
                   // console.log('# true\n');
                    changeMap[y][x] = 'L'
                    changes = true;
                    console.log('test2');
                }else{
                 //   console.log('# false\n');
                }
            }
        });
    });
    Object.keys(map).forEach((y)=>{
        y = parseInt(y);
        let row = '';
        Object.keys(map[y]).forEach((x)=>{
            x = parseInt(x);
            row += map[y][x];
        });
        console.log(row);
    });
    console.log('\n\n');
    map = JSON.parse(JSON.stringify(changeMap));   
}
Object.keys(map).forEach((y)=>{
    y = parseInt(y);
    let row = '';
    Object.keys(map[y]).forEach((x)=>{
        x = parseInt(x);
        row += map[y][x];
    });
    console.log(row);
});
console.log(`first number: ${occupied}`);