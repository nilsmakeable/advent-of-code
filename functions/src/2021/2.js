let list = document.querySelector("pre").innerText.split("\n");
let debth = 0;
let forward = 0;
list.forEach((row)=>{
    const parts = row.split(" ");
    switch(parts[0]){
        case "forward":
            forward = parseInt(forward) + parseInt(parts[1]);
            break;
            case 'down':
                debth = parseInt(debth) + parseInt(parts[1]);
            break;
            case 'up':
                debth = parseInt(debth) - parseInt(parts[1]);
            break;
    }

});
console.log('first number: '+debth*forward);
let aim = 0;
debth = 0;
forward = 0;
list.forEach((row)=>{
    const parts = row.split(" ");
    switch(parts[0]){
        case "forward":
            forward = parseInt(forward) + parseInt(parts[1]);
            debth = parseInt(debth) + (parseInt(parts[1])*parseInt(aim));
            break;
            case 'down':
                aim = parseInt(aim) + parseInt(parts[1]);
            break;
            case 'up':
                aim = parseInt(aim) - parseInt(parts[1]);
            break;
    }

});
console.log('secound number: '+debth*forward);