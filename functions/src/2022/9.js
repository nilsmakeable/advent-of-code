const list = document.querySelector('pre').innerText.split('\n');
const map1 = {'0,0':true};
const map2 = {'0,0':true};
let H = {y:0,x:0};
let T1 = {y:0,x:0};
let T2 = {y:0,x:0};
let T3 = {y:0,x:0};
let T4 = {y:0,x:0};
let T5 = {y:0,x:0};
let T6 = {y:0,x:0};
let T7 = {y:0,x:0};
let T8 = {y:0,x:0};
let T9 = {y:0,x:0};

const move = (dir) => {
    switch(dir) {
        case 'R':
            H.x += 1;
            break;
        case 'L':
            H.x -= 1;
            break;
        case 'U':
            H.y -= 1;
            break;
        case 'D':
            H.y += 1;
            break;
        default:
    }

    if(Math.abs(H.x-T1.x) > 1 || Math.abs(H.y-T1.y) > 1) {
        if(Math.abs(H.x-T1.x)>0) T1.x = T1.x - H.x > 0 ? T1.x - 1 : T1.x + 1;
        if(Math.abs(H.y-T1.y)>0) T1.y = T1.y - H.y < 0 ? T1.y + 1 : T1.y - 1;
        map1[`${T1.x},${T1.y}`] = true;
    }
    if(Math.abs(T1.x-T2.x) > 1 || Math.abs(T1.y-T2.y) > 1) {
        if(Math.abs(T1.x-T2.x)>0) T2.x = T2.x - T1.x > 0 ? T2.x - 1 : T2.x + 1;
        if(Math.abs(T1.y-T2.y)>0) T2.y = T2.y - T1.y < 0 ? T2.y + 1 : T2.y - 1;
    }
    if(Math.abs(T2.x-T3.x) > 1 || Math.abs(T2.y-T3.y) > 1) {
        if(Math.abs(T2.x-T3.x)>0) T3.x = T3.x - T2.x > 0 ? T3.x - 1 : T3.x + 1;
        if(Math.abs(T2.y-T3.y)>0) T3.y = T3.y - T2.y < 0 ? T3.y + 1 : T3.y - 1;
    }
    if(Math.abs(T3.x-T4.x) > 1 || Math.abs(T3.y-T4.y) > 1) {
        if(Math.abs(T3.x-T4.x)>0) T4.x = T4.x - T3.x > 0 ? T4.x - 1 : T4.x + 1;
        if(Math.abs(T3.y-T4.y)>0) T4.y = T4.y - T3.y < 0 ? T4.y + 1 : T4.y - 1;
    }
    if(Math.abs(T4.x-T5.x) > 1 || Math.abs(T4.y-T5.y) > 1) {
        if(Math.abs(T4.x-T5.x)>0) T5.x = T5.x - T4.x > 0 ? T5.x - 1 : T5.x + 1;
        if(Math.abs(T4.y-T5.y)>0) T5.y = T5.y - T4.y < 0 ? T5.y + 1 : T5.y - 1;
    }   
    if(Math.abs(T5.x-T6.x) > 1 || Math.abs(T5.y-T6.y) > 1) {
        if(Math.abs(T5.x-T6.x)>0) T6.x = T6.x - T5.x > 0 ? T6.x - 1 : T6.x + 1;
        if(Math.abs(T5.y-T6.y)>0) T6.y = T6.y - T5.y < 0 ? T6.y + 1 : T6.y - 1;
    }
    if(Math.abs(T6.x-T7.x) > 1 || Math.abs(T6.y-T7.y) > 1) {
        if(Math.abs(T6.x-T7.x)>0) T7.x = T7.x - T6.x > 0 ? T7.x - 1 : T7.x + 1;
        if(Math.abs(T6.y-T7.y)>0) T7.y = T7.y - T6.y < 0 ? T7.y + 1 : T7.y - 1;
    }
    if(Math.abs(T7.x-T8.x) > 1 || Math.abs(T7.y-T8.y) > 1) {
        if(Math.abs(T7.x-T8.x)>0) T8.x = T8.x - T7.x > 0 ? T8.x - 1 : T8.x + 1;
        if(Math.abs(T7.y-T8.y)>0) T8.y = T8.y - T7.y < 0 ? T8.y + 1 : T8.y - 1;
    }
    if(Math.abs(T8.x-T9.x) > 1 || Math.abs(T8.y-T9.y) > 1) {
        if(Math.abs(T8.x-T9.x)>0) T9.x = T9.x - T8.x > 0 ? T9.x - 1 : T9.x + 1;
        if(Math.abs(T8.y-T9.y)>0) T9.y = T9.y - T8.y < 0 ? T9.y + 1 : T9.y - 1;
        map2[`${T9.x},${T9.y}`] = true;
    }
};


list.forEach((line,index) => {
    const dir = line.split(' ')[0];
    const times = parseInt(line.split(' ')[1]);
    for(let i = 0; i < times; i++) move(dir);
});

console.log(`first number: ${Object.keys(map1).length}`);
console.log(`secound number: ${Object.keys(map2).length}`);
