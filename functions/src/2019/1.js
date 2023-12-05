const input = document
    .querySelector('pre')
    .innerText.split(',')
    .map((number) => parseInt(number));

input[1] = 12;
input[2] = 2;

const run = (list) => {
    let i = 0;
    while (list[i] !== 99) {
        const [opcode, a, b, c] = list.slice(i, i + 4);
        switch (opcode) {
            case 1:
                list[c] = list[a] + list[b];
                break;
            case 2:
                list[c] = list[a] * list[b];
                break;
            case 99:
                break;
            default:
                throw new Error(`Unknown opcode index:${i}, opcode:${opcode}`);
        }
        i += 4;
    }
    return list;
};

console.log(`part 1: ${run([...input])[0]}`);

// part2

const findNounAndVerb = (list, target) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const copy = [...list];
            copy[1] = noun;
            copy[2] = verb;
            if (run(copy)[0] === target) {
                return { noun, verb };
            }
        }
    }
};

const { noun, verb } = findNounAndVerb(input, 19690720);
console.log(`part 2: ${100 * noun + verb}`);
