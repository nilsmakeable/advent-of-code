const list = document.querySelector('pre').innerText.split('\n');

const hexToBin = (char) => {
    switch (char) {
        case '0':
            return '0000';
        case '1':
            return '0001';
        case '2':
            return '0010';
        case '3':
            return '0011';
        case '4':
            return '0100';
        case '5':
            return '0101';
        case '6':
            return '0110';
        case '7':
            return '0111';
        case '8':
            return '1000';
        case '9':
            return '1001';
        case 'A':
            return '1010';
        case 'B':
            return '1011';
        case 'C':
            return '1100';
        case 'D':
            return '1101';
        case 'E':
            return '1110';
        case 'F':
            return '1111';
        default:
            console.log('error in hextobin');
            return '';
    }
};
let binary = '';

list[0].split('').forEach((char) => {
    binary += hexToBin(char);
});

const parsePackage = (str) => {
    if (str === '') return { number: 0, offset: 0 };
    const version = str.substr(0, 3);
    versionAcc += parseInt(version, 2);
    const typeId = str.substr(3, 3);
    let offset = 5;
    switch (parseInt(typeId, 2)) {
        case 4:
            let number = '';
            while (str[offset + 1] === '1') {
                number += str.substr(offset + 2, 4);
                offset += 5;
            }
            number += str.substr(offset + 2, 4);
            offset += 5;
            return { number: parseInt(number, 2), offset };
        default:
            if (str[offset + 1] === '0') {
                const length = parseInt(str.substr(offset + 2, 15), 2);
                offset = offset + 2 + 15;
                const vals = [];
                let readLen = 0;
                while (length > readLen) {
                    const res = parsePackage(str.substr(offset, length - readLen));
                    offset += res.offset + 1;
                    vals.push(res.number);
                    readLen += res.offset + 1;
                }

                return { number: calc(parseInt(typeId, 2), vals), offset: offset - 1 };
            }
            const nrSubPackages = parseInt(str.substr(offset + 2, 11), 2);
            offset = offset + 2 + 11;
            const vals = [];
            let readNr = 0;
            while (nrSubPackages > readNr) {
                const res = parsePackage(str.substr(offset));
                offset += res.offset + 1;
                vals.push(res.number);
                readNr++;
            }
            return { number: calc(parseInt(typeId, 2), vals), offset: offset - 1 };
    }
};

const calc = (type, vals) => {
    switch (type) {
        case 0: // sum
            return vals.reduce((sum, val) => sum + val, 0);
        case 1: // Product
            return vals.reduce((sum, val) => sum * val, 1);
        case 2: // MIN
            return Math.min(...vals);
        case 3: // MAX
            return Math.max(...vals);
        case 5: // gt 1>2 => 1 else 0
            return vals[0] > vals[1] ? 1 : 0;
        case 6: // MIN 1<2 => 1 else 0
            return vals[0] < vals[1] ? 1 : 0;
        case 7: // EQ 1==2 => 1 else 0
            return vals[0] === vals[1] ? 1 : 0;
        default:
            console.log(`Error in calc id:${type}`);
            return -1;
    }
};
let versionAcc = 0;
const result = parsePackage(binary);
console.log(versionAcc);
console.log(result);
