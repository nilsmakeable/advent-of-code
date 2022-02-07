/* eslint-disable no-control-regex */
const data = document.querySelector('pre').innerText.split('\n\n');
data.pop();
const tiles = {};

data.forEach((tile) => {
    const parts = tile.split('\n');
    const id = parts[0].replace('Tile ', '').replace(':', '');
    const edges = {};
    let left = '';
    let right = '';
    const content = [];

    for (let i = 1; i < parts.length; i++) {
        left += parts[i][0];
        right += parts[i][9];
        if (i !== 1 && i !== parts.length - 1) content.push(parts[i].substring(1, 9));
    }
    edges[0] = parts[1];
    edges[1] = left;
    edges[2] = right;
    edges[3] = parts[parts.length - 1];
    tiles[id] = { id, edges, parts, content };
});

Object.keys(tiles).map((key) => {
    tiles[key].matches = {};
    Object.keys(tiles[key].edges).forEach((edgeKey) => {
        const edge = tiles[key].edges[edgeKey];
        for (const cTileKey of Object.keys(tiles)) {
            if (key !== cTileKey) {
                const cTile = tiles[cTileKey];
                if (Object.values(cTile.edges).includes(edge) || Object.values(cTile.edges).includes(edge.split('').reverse().join(''))) {
                    if (tiles[key].matches[edgeKey] !== undefined) console.log(`clash: ${tiles[key].matches[edgeKey]} vs ${cTile.id}`);
                    tiles[key].matches[edgeKey] = cTile.id;
                    break;
                }
            }
        }
    });
    return tiles[key];
});

let acc = 1;
const corners = Object.keys(tiles).filter((tileId) => Object.keys(tiles[tileId].matches).length === 2);
corners.forEach((val) => {
    acc *= parseInt(val);
});
console.log(acc);

const flipTile = (tile, dir) => {
    if (dir === 'left') {
        // flip up
        tile.content = tile.content.reverse();
        tile.matches = { 0: tile.matches[3], 1: tile.matches[1], 2: tile.matches[2], 3: tile.matches[0] };
        tile.edges = { 0: tile.edges[3], 1: tile.edges[1].split('').reverse().join(''), 2: tile.edges[2].split('').reverse().join(''), 3: tile.edges[0] };
    } else {
        // flip side
        tile.content = tile.content.map((line) => line.split('').reverse().join(''));
        tile.matches = { 0: tile.matches[0], 1: tile.matches[2], 2: tile.matches[1], 3: tile.matches[3] };
        tile.edges = { 0: tile.edges[0].split('').reverse().join(''), 1: tile.edges[2], 2: tile.edges[1], 3: tile.edges[3].split('').reverse().join('') };
    }
    return tile;
};

const rotateTile = (tile, match1, match2, dir) => {
    while ((dir === 'left' && tile.matches[1] !== match1) || (dir === 'top' && tile.matches[0] !== match1)) tile = rotateTile90(tile);
    if ((dir === 'left' && tile.matches[0] !== match2) || (dir === 'top' && tile.matches[1] !== match2)) tile = flipTile(tile, dir);

    // if (dir === 'left' && tiles[match1].edges[2] !== tile.edges[1]) tile = rotateTile(flipTile(tile, dir === 'left' ? 'top' : 'left'), match1, match2, dir);
    return tile;
};
const rotateTile90 = (tile) => {
    tile.matches = { 0: tile.matches[1], 1: tile.matches[3], 2: tile.matches[0], 3: tile.matches[2] };
    tile.edges = { 0: tile.edges[1].split('').reverse().join(''), 1: tile.edges[3], 2: tile.edges[0], 3: tile.edges[2].split('').reverse().join('') };
    let content = [];
    for (let i = tile.content.length - 1; i >= 0; i--) {
        if (i === tile.content.length) content = tile.content[i].split('');
        else {
            const str = tile.content[i].split('');
            for (let n = 0; n < str.length; n++) {
                if (content[n] === undefined) content[n] = '';
                content[n] += str[n];
            }
        }
    }
    tile.content = content;
    return tile;
};

acc = 0;

let cornersUsed = 1;
let x = 1;
let y = 0;
const startCorner = corners[2];
for (let i = 0; i < 4; i++) {
    if (tiles[startCorner].matches[2] === undefined || tiles[startCorner].matches[3] === undefined) {
        tiles[startCorner] = rotateTile90(tiles[startCorner]);
    }
}
let prev = tiles[startCorner];
const map = { '0,0': startCorner };
while (cornersUsed !== 4) {
    map[`${y},${x}`] = prev.matches[x === 0 ? 3 : 2];
    tiles[prev.matches[x === 0 ? 3 : 2]] = rotateTile(tiles[prev.matches[x === 0 ? 3 : 2]], prev.id, x === 0 || y === 0 ? undefined : tiles[map[`${y - 1},${x}`]].id, x === 0 ? 'top' : 'left');
    prev = tiles[prev.matches[x === 0 ? 3 : 2]];
    if (x === 11) {
        x = 0;
        y++;
        prev = tiles[map[`${y - 1},${x}`]];
    } else x++;
    if (corners.includes(prev.id)) cornersUsed++;
}
const pic = {};
for (y = 0; y < 12; y++) {
    for (x = 0; x < 12; x++) {
        const len = tiles[map[`${y},${x}`]].content.length;
        for (let n = 0; n < len; n++) {
            if (pic[y * len + n] === undefined) pic[y * len + n] = '';
            pic[y * len + n] += tiles[map[`${y},${x}`]].content[n];
        }
    }
}

const findSeaMonster = (image) => {
    /* There be monsters:
      >..................# <
      >#....##....##....###<
      >.#..#..#..#..#..#...<
                         # 
       #    ##    ##    ###
        #  #  #  #  #  #   
    */
    const earlier = image.match(/#/g).length;
    image = image.split('\n');
    let monsters = 0;
    for (let i = 1; i < image.length - 1; i++) {
        const monster = /#....##....##....###/g;
        let first = true;
        let match = null;
        while (first || match !== null) {
            first = false;
            match = monster.exec(image[i]);
            if (match !== null && image[i - 1][match.index + 18] === '#' && image[i + 1].substr(match.index, 20).match(/.#..#..#..#..#..#.../) !== null) {
                monsters++;
                image[i - 1] = `${image[i - 1].substr(0, match.index + 18)}O${image[i - 1].substr(match.index + 19)}`;
                image[i] = `${image[i].substr(0, match.index)}O${image[i].substr(match.index + 1, 4)}OO${image[i].substr(match.index + 7, 4)}OO${image[i].substr(match.index + 13, 4)}OOO${image[i].substr(
                    match.index + 20
                )}`;
                image[i + 1] = `${image[i + 1].substr(0, match.index + 1)}O${image[i + 1].substr(match.index + 2, 2)}O${image[i + 1].substr(match.index + 5, 2)}O${image[i + 1].substr(
                    match.index + 8,
                    2
                )}O${image[i + 1].substr(match.index + 11, 2)}O${image[i + 1].substr(match.index + 14, 2)}O${image[i + 1].substr(match.index + 17)}`;
            }
            monster.lastIndex = match !== null ? match.index + 1 : 0;
        }
    }

    if (monsters > 0) {
        console.log(image.forEach((line) => console.log(line)));
        console.log(monsters, 'sea monsters found!');
        console.log(image.join('\n').match(/#/g).length, 'roughness');
        console.log(`sanity: ${earlier}, ${earlier - 15 * monsters}`);
        return true;
    }
    return false;
};

const rotatePic90 = (image) => {
    const content = {};
    const keys = Object.keys(image).reverse();
    keys.forEach((key) => {
        const str = image[key].split('');
        for (let n = 0; n < str.length; n++) {
            if (content[n] === undefined) content[n] = '';
            content[n] += str[n];
        }
    });
    Object.keys(content).forEach((key) => {
        image[key] = content[key];
    });
    return image;
};

let str = [];
for (let n = 0; n < 12; n++) {
    for (let m = 0; m < 12; m++) {
        const edges = tiles[map[`${n},${m}`]].edges;
        if (str[0] === undefined) str[0] = ` ${edges[0]}`;
        else str[0] += ` ${edges[0]}`;
        for (let k = 1; k < 9; k++) {
            if (str[k] === undefined) str[k] = ` ${edges[1][k]}  ${k === 4 ? map[`${n},${m}`] : '    '}  ${edges[2][k]}`;
            else str[k] += ` ${edges[1][k]}  ${k === 4 ? map[`${n},${m}`] : '    '}  ${edges[2][k]}`;
        }
        if (str[9] === undefined) str[9] = ` ${edges[3]}`;
        else str[9] += ` ${edges[3]}`;
    }
    console.log(str.join('\n'));
    str = [];
}

let work = pic;

console.log('rotate');
findSeaMonster(Object.values(work).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
Object.keys(work).forEach((key) => {
    work[key] = work[key].split('').reverse().join('');
});
console.log('flip');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
work = rotatePic90(work);
console.log('rotate');
findSeaMonster(Object.values(pic).join('\n'));
