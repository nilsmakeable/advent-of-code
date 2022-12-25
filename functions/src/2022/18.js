const input = document.querySelector('pre').innerText.split('\n');
input.pop();
const map = [...Array(30).keys()].map((y)=>[...Array(30).keys()].map((x)=>[...Array(30).keys()].map((z)=>-1)));


input.forEach((row)=>{
  [x,y,z] = row.split(',').map((c)=>parseInt(c));
  map[x][y][z] = 1;
});

let acc = 0;

input.forEach((row)=>{
  [x,y,z] = row.split(',').map((c)=>parseInt(c));
  if(map[x+1][y][z]===-1)acc++;
  if(!map[x-1] || map[x-1][y][z]===-1)acc++;
  if(map[x][y+1][z]===-1)acc++;
  if(!map[x][y-1] || map[x][y-1][z]===-1)acc++;
  if(map[x][y][z+1]===-1)acc++;
  if(!map[x][y][z-1] || map[x][y][z-1]===-1)acc++;
});

console.log(`first number:  ${acc}`);

//Flood outside with 1 take result from before and subtract new result on same run
let queue = [[29,29,29]];
while(queue.length > 0){
  const [x,y,z] = queue.pop();
  map[x][y][z] = 1;
  if(map[x+1] && map[x+1][y][z]===-1)queue.push([x+1,y,z]);
  if(map[x-1] && map[x-1][y][z]===-1)queue.push([x-1,y,z]);
  if(map[x][y+1] && map[x][y+1][z]===-1)queue.push([x,y+1,z]);
  if(map[x][y-1] && map[x][y-1][z]===-1)queue.push([x,y-1,z]);
  if(map[x][y][z+1] && map[x][y][z+1]===-1)queue.push([x,y,z+1]);
  if(map[x][y][z-1] && map[x][y][z-1]===-1)queue.push([x,y,z-1]);
}

let acc2 = 0;

input.forEach((row)=>{
  [x,y,z] = row.split(',').map((c)=>parseInt(c));
  if(map[x+1][y][z]===-1)acc2++;
  if(map[x-1] && map[x-1][y][z]===-1)acc2++;
  if(map[x][y+1][z]===-1)acc2++;
  if(map[x][y-1] && map[x][y-1][z]===-1)acc2++;
  if(map[x][y][z+1]===-1)acc2++;
  if(map[x][y][z-1] && map[x][y][z-1]===-1)acc2++;
});
console.log(`secound number: ${acc-acc2}`);
