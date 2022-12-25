let grid = document.querySelector('pre').innerText.trim().split('\n').map((row)=>row.split('').map((c)=>c === '#' ? '#' : (c==='.' ? [] : [c])));

let exps = [{x:1,y:0}];

let found = false;
let step = 0;
let goal = {x:grid[0].length-2, y:grid.length-1};
const run = () => {
    while(!found){
        step++;
        let newGrid = grid.map((row)=>row.map((c)=>c === '#' ? '#' : []));
        grid.map((row, y)=>row.map((c, x)=>{
            if(c !=='#'){
                c.forEach((e)=>{
                    switch(e){
                        case '<':
                            if(newGrid[y][x-1] === '#') newGrid[y][grid[y].length-2].push('<');
                            else newGrid[y][x-1].push('<');
                            break;
                        case '>':
                            if(newGrid[y][x+1] === '#') newGrid[y][1].push('>');
                            else newGrid[y][x+1].push('>');
                            break;
                        case '^':
                            if(newGrid[y-1][x] === '#') newGrid[newGrid.length-2][x].push('^');
                            else newGrid[y-1][x].push('^');
                            break;
                        case 'v':
                            if(newGrid[y+1][x] === '#') newGrid[1][x].push('v');
                            else newGrid[y+1][x].push('v');
                            break;
                    }
                });
            }
        }));
        grid = newGrid;
        const newExps = [];
        exps.forEach((e)=>{
            if(grid[e.y][e.x].length === 0)
                newExps.push(e);
            if(grid[e.y+1] && grid[e.y+1][e.x].length === 0)
                newExps.push({x:e.x, y:e.y+1});
            if(grid[e.y-1] && grid[e.y-1][e.x].length === 0)
                newExps.push({x:e.x, y:e.y-1});
            if(grid[e.y][e.x+1].length === 0)
                newExps.push({x:e.x+1, y:e.y});
            if(grid[e.y][e.x-1].length === 0)
                newExps.push({x:e.x-1, y:e.y});
        });
        exps = newExps.filter((e, i, a)=>a.findIndex((e2)=>e2.x === e.x && e2.y === e.y) === i);
        if(exps.find((e)=>e.x === goal.x && e.y === goal.y))
            found = true;
    }
}

run();
console.log(`first answer: ${step}`);


exps = [{x:grid[0].length-2, y:grid.length-1}];
found = false;
goal = {x:2, y:1};
run();
exps = [{x:1,y:0}];
found = false;
goal = {x:grid[0].length-2, y:grid.length-1};
run();
console.log(`secound answer: ${step}`);