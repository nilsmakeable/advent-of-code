const list = document.querySelector('pre').innerText.split('\n');
list.pop();
let part1Start = [];
let end = '';
const possibleStart = [];
const mazeStart = list.map((row,y) => row.split('').map((char,x) => {
    if(char === 'S'){ 
        part1Start.push({x,y});
        char = 'a';
    }
    if(char === 'E'){ 
        end = `${x},${y}`;
        char = 'z';
    }
    if(char === 'a') possibleStart.push({x,y});
    return {height: char.charCodeAt(0), visited: false};
}));

const calc = (current,maze) => {
    let found = false;
    let steps = 0;

    maze[current[0].y][current[0].x].visited = true;
    while(current.length > 0 && !found){
        const next = [];
        steps++;
        current.forEach((pos) => {
            const {x,y} = pos;
            if(`${x},${y}` === end){ 
                found = true;
            }
            if(maze[y][x+1] && (maze[y][x+1].height-1 <= maze[y][x].height) && !maze[y][x+1].visited){
                next.push({x: x+1, y});
                maze[y][x+1].visited = true;
            }
            if(maze[y][x-1] && (maze[y][x-1].height-1 <= maze[y][x].height) && !maze[y][x-1].visited){
                next.push({x: x-1, y});
                maze[y][x-1].visited = true;
            }
            if(maze[y+1] && (maze[y+1][x].height-1 <= maze[y][x].height) && !maze[y+1][x].visited){
                next.push({x, y: y+1});
                maze[y+1][x].visited = true;
            }
            if(maze[y-1] && (maze[y-1][x].height-1 <= maze[y][x].height) && !maze[y-1][x].visited){
                next.push({x, y: y-1});
                maze[y-1][x].visited = true;
            }
        });
        current = next;
    }
    return found ? steps-1 : Number.MAX_VALUE;
}

console.log(`first number: ${calc(part1Start,JSON.parse(JSON.stringify(mazeStart)))}`);

let bestStartSteps = Number.MAX_VALUE;

for(let i=0;i<possibleStart.length;i++){
    const candidate = calc([possibleStart[i]],JSON.parse(JSON.stringify(mazeStart)));
    if(candidate < bestStartSteps){
         bestStartSteps = candidate;
    }
}
console.log(`secound number: ${bestStartSteps}`);

