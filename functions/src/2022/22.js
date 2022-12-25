const [s1, s2] = document.querySelector('pre').innerText.split('\n\n');
const M = {};
let start;
s1.split('\n').forEach((l, y) =>
    l.split('').forEach((c, x) => {
        if (c !== ' ') {
            M[`${x},${y}`] = c;
            if (!start) start = [x, y];
        }
    })
);
const steps= s2
    .match(/(\d+|[LR])/g)
    .map((s) => (/[LR]/.test(s) ? (s) : +s));

const DIRS = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0]
};
const TURNS = {
    U: { L: 'L', R: 'R' },
    R: { L: 'U', R: 'D' },
    D: { L: 'R', R: 'L' },
    L: { L: 'D', R: 'U' }
};

const walk = (nextPos) => {
    let facing = 'R';
    let pos = [...start];
    steps.forEach((s) => {
        if (Number.isInteger(s)) {
            for (let i = 0; i < s; i++) {
                const { pos: next, facing: _facing } = nextPos({ pos, facing });
                facing = _facing;
                if (M[next + ''] === '#') break;
                pos = next;
            }
        } else {
            facing = TURNS[facing][s];
        }
    });
    return { pos, facing };
};

const facingValues = { U: 3, R: 0, L: 2, D: 1 };
const getValue = ({ pos: [x, y], facing }) => {
    return 1000 * (y + 1) + 4 * (x + 1) + facingValues[facing];
};

const walkToTheEnd = (pos, facing) => {
    const dir = DIRS[facing];
    while (true) {
        const next = pos.map((n, i) => n + dir[i]);
        if (M[next + ''] === undefined) return pos;
        pos = next;
    }
};

const nextPos = ({ pos, facing }) => {
    const next = pos.map((n, i) => n + DIRS[facing][i]);
    if (M[next + ''] !== undefined) return { pos: next, facing };
    if (facing === 'R') return { pos: walkToTheEnd(pos, 'L'), facing };
    if (facing === 'L') return { pos: walkToTheEnd(pos, 'R'), facing };
    if (facing === 'U') return { pos: walkToTheEnd(pos, 'D'), facing };
    if (facing === 'D') return { pos: walkToTheEnd(pos, 'U'), facing };
    throw new Error('invalid state');
};
console.log(`first number: ${getValue(walk(nextPos))}`);

function d22b() { 
    let inp = (document.body.innerText+"\n").split("\n\n");

    let map = [""].concat(inp[0].split("\n").map(x=>" "+x+" ")).concat([""]);
    let inst = inp[1].replaceAll("L"," L ").replaceAll("R"," R ").split(" ");
    
    let px = 51;
    let py = 1;
    let facing = 0;
    let fx = [1,0,-1,0];
    let fy = [0,1,0,-1];
    
    mainLoop:
    for (let i=0;i<inst.length;i++) {
      if (inst[i] == "L") {
        facing--;
        if (facing<0) facing+=4;
      } else if (inst[i] == "R") {
        facing++;
        facing = facing%4;
      } else { //number
        let t = +(inst[i]);
        for (let j=0;j<t;j++) {
          let ny = py+fy[facing];
          let nx = px+fx[facing];
          let next = map[ny][nx];
          
          let nfacing = facing;
          if (next == " " || next == undefined) { 

            switch(facing) {
              case 0: //right
                if (py<=50) {
                  nfacing = 2;
                  ny = 151-py;
                  nx = 100;
                } else if (py<=100) {
                  nfacing = 3;
                  ny = 50;
                  nx = 50+py;
                } else if (py<=150) {
                  nfacing = 2;
                  ny = 151-py;
                  nx = 150;
                } else {
                  nfacing = 3;
                  ny = 150;
                  nx = py-100;
                }
                break;
              case 1: //down
                if (px <= 50) {
                  nfacing = 1;
                  ny = 1;
                  nx = px+100;
                } else if (px <= 100) {
                  nfacing = 2;
                  ny = px+100;
                  nx = 50;
                } else {
                  nfacing = 2;
                  ny = px-50;
                  nx = 100;
                }
                break;
              case 2: //left
                if (py<=50) {
                  nfacing = 0;
                  ny = 151-py;
                  nx = 1;
                } else if (py<=100) {
                  nfacing = 1;
                  ny = 101;
                  nx = py-50;
                } else if (py<=150) {
                  nfacing = 0;
                  ny = 151-py;
                  nx = 51;
                } else {
                  nfacing = 1;
                  ny = 1;
                  nx = py-100;
                }
                break;
              case 3: //up
                if (px <= 50) {
                  nfacing = 0;
                  ny = px+50;
                  nx = 51;
                } else if (px <= 100) {
                  nfacing = 0;
                  ny = px+100;
                  nx = 1;
                } else {
                  nfacing = 3;
                  ny = 200;
                  nx = px-100;
                }
                break;
            }
            next = map[ny][nx];
          }
          if (next == "#") {
            continue mainLoop;
          }
          if (next == ".") {
            py = ny;
            px = nx;
            facing = nfacing;
          }
        }
      }
    }
    return py*1000+px*4+facing;
  }

  console.log(`second number: ${d22b()}`);