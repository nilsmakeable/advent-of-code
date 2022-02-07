const list = document.querySelector('pre').innerText.split('\n');
list.pop();
const all = {};

const map = {};

list.forEach((item) => {
    const parts = item.split(' (contains ');
    const contains = parts[1].replace(')', '').split(', ');
    contains.forEach((con) => {
        if (map[con] === undefined) map[con] = parts[0].split(' ');
        else {
            map[con] = map[con].filter((i) => {
                return parts[0].split(' ').includes(i);
            });
            if (map[con].length === 1) {
                Object.keys(map).forEach((key) => {
                    if (key !== con)
                        map[key] = map[key].filter((i) => {
                            return i !== map[con][0];
                        });
                });
            }
        }
    });
    parts[0].split(' ').forEach((ing) => {
        if (all[ing] === undefined) all[ing] = 0;
        all[ing]++;
    });
});

let acc = 0;

Object.keys(all).forEach((key) => {
    if (
        !Object.values(map)
            .map((arr) => arr[0])
            .includes(key)
    )
        acc += all[key];
});
console.log(acc);

console.log(
    Object.values(
        Object.keys(map)
            .sort()
            .reduce((obj, key) => {
                obj[key] = map[key];
                return obj;
            }, {})
    )
        .map((arr) => arr[0])
        .join(',')
);
