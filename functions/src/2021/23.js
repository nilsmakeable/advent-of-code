const startRooms = {
    0: { 0: 'B', 1: 'D' },
    1: { 0: 'A', 1: 'D' },
    2: { 0: 'B', 1: 'C' },
    3: { 0: 'A', 1: 'C' },
};
const acost = { A: 1, B: 10, C: 100, D: 1000 };

/*

 0,1,x,2,x,3,x,4,x,5,6

#############
#...........#
###D#D#C#C###
  #B#A#B#A#
  #########
*/

const scores = [];

const move = (hall, rooms, cost) => {
    if (rooms[0][0] === 'A' && rooms[0][1] === 'A' && rooms[1][0] === 'B' && rooms[1][1] === 'B' && rooms[2][0] === 'C' && rooms[2][1] === 'C' && rooms[3][0] === 'D' && rooms[3][1] === 'D') {
        scores.push(cost);
    } else {
        const possibleMoves = [];
        if (rooms[0][0] !== 'A' && rooms[0][0] !== false) {
        }
        possibleMoves.forEach((m) => {
            move(JSON.parse(JSON.stringify(hall), JSON.parse(JSON.stringify(rooms))), cost + moveCost);
        });
    }
};

move({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false }, startRooms, 0);
Math.min(scores);
