const list = document.querySelector('pre').innerText.split('\n');
const map = {};
list.forEach((row,index) => {
    let [_1,x,_2,y,_3,x1,_4,y1] = row.split(new RegExp('[=,:]')).map((r)=> parseInt(r));
    if(y===2000000){
        map[y] = map[y] || [];
        map[y][x] = map[y][x] || 'S';
    }
    if(y1===2000000){
        map[y1] = map[y1] || [];
        map[y1][x1] = map[y1][x1] || 'B';
    }
    const dist = Math.abs(x1-x) + Math.abs(y1-y);
    for(i=dist; i>=0; i--){
        if(y+i === 2000000 || y-i === 2000000){
            if(y+i === 2000000)
                map[y+i] = map[y+i] || [];
            if(y-i === 2000000)
                map[y-i] = map[y-i] || [];
            for(j=dist-i;j>=0;j--){
                if(y+i === 2000000){
                    map[y+i][x+j] = map[y+i][x+j] || '#';
                    map[y+i][x-j] = map[y+i][x-j] || '#';
                }
                if(y-i === 2000000){
                    map[y-i][x+j] = map[y-i][x+j] || '#';
                    map[y-i][x-j] = map[y-i][x-j] || '#';
                }
            }
        }
    }
});
console.log(`first number: ${Object.values(map[2000000]).filter((c)=> c !=='B').length}`);
const entries = [];
list.forEach((row,index) => {
    let [_1,x,_2,y,_3,x1,_4,y1] = row.split(new RegExp('[=,:]')).map((r)=> parseInt(r));
    entries.push({x,y,dist:Math.abs(x1-x) + Math.abs(y1-y)});
});

const checkFree = (x,y) => {
    if(x > 4000000 || y > 4000000 || x < 0 || y < 0) return false;
    let inside = false;
    entries.forEach((entry) => {
        if(!inside && Math.abs(entry.x-x) + Math.abs(entry.y-y) <= entry.dist) inside = true;
    });
    if(!inside) console.log(`secound number: ${x*4000000+y}`);
    return !inside;
}

entries.forEach((entry) => {
    const dist = entry.dist;
    for(i=dist+1; i>=0; i--){
        if(!map[entry.y+i] || !map[entry.y+i][entry.x+(dist+1-i)]) checkFree(entry.x+(dist+1-i),entry.y+i);
        if(!map[entry.y-i] || !map[entry.y-i][entry.x+(dist+1-i)]) checkFree(entry.x+(dist+1-i),entry.y-i);
        if(!map[entry.y+i] || !map[entry.y+i][entry.x-(dist-1-i)]) checkFree(entry.x-(dist-1-i),entry.y+i);
        if(!map[entry.y-i] || !map[entry.y-i][entry.x-(dist-1-i)]) checkFree(entry.x-(dist-1-i),entry.y-i);
    }
});

