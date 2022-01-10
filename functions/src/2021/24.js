const input = document.querySelector('pre').innerText.split('\n');
input.pop();
const vars = { x: 0, y: 0, z: 0, w: 0 };
let index = 0;
const test = (number) => {
    input.forEach((line) => {
        const parts = line.split(' ');
        // eslint-disable-next-line no-restricted-globals
        const num = !isNaN(parts[2]) ? parseInt(parts[2]) : vars[parts[2]];
        switch (parts[0]) {
            case 'add':
                vars[parts[1]] += num;
                break;
            case 'inp':
                vars[parts[1]] = parseInt(`${number}`[index++]);
                break;
            case 'mul':
                vars[parts[1]] *= num;
                break;
            case 'div':
                vars[parts[1]] = Math.floor(vars[parts[1]] / num);
                break;
            case 'mod':
                vars[parts[1]] %= num;
                break;
            case 'eql':
                vars[parts[1]] = vars[parts[1]] === num ? 1 : 0;
                break;
            default:
                console.log('Unknown');
        }
    });

    return vars.z === 0;
};

test('93997999296912');
