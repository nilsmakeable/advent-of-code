const list = document.querySelector('pre').innerText.split('\n');

const fileTree = { directories: [], files: [], dirSize: 0, parent: null };
let currentFolder = fileTree;
list.forEach((row) => {
    if (row !== '' && row !== '$ ls') {
        if (row === '$ cd /') currentFolder = fileTree;
        else if (row.indexOf('dir') === 0) {
            const folderName = row.split(' ')[1];
            currentFolder.directories[folderName] = { directories: [], files: [], dirSize: 0, parent: currentFolder };
        } else if (!Number.isNaN(parseInt(row.split(' ')[0]))) {
            const file = row.split(' ');
            currentFolder.files.push(parseInt(file[0]));
        } else if (row === '$ cd ..') {
            currentFolder = currentFolder.parent;
        } else if (row.indexOf('$ cd') === 0) {
            const folderName = row.split(' ')[2];
            currentFolder = currentFolder.directories[folderName];
        }
    }
});

const getDirSize = (folder) => {
    folder.files.forEach((file) => {
        folder.dirSize += file;
    });
    Object.keys(folder.directories).forEach((dir) => {
        getDirSize(folder.directories[dir]);
        folder.dirSize += folder.directories[dir].dirSize;
    });
};
getDirSize(fileTree);

let acc = 0;

const findSmallFolders = (folder) => {
    if (folder.dirSize < 100000) {
        acc += folder.dirSize;
    }
    Object.keys(folder.directories).forEach((dir) => {
        findSmallFolders(folder.directories[dir]);
    });
};
findSmallFolders(fileTree);
console.log(`first answer: ${acc}`);

const totalSpace = 70000000;
const requiredSpace = 30000000;
const currentSpace = totalSpace - fileTree.dirSize;
const dirOfAtLeastSize = requiredSpace - currentSpace;

const bestCandidate = { dirSize: totalSpace };
const findDir = (folder) => {
    if (folder.dirSize >= dirOfAtLeastSize) {
        if (folder.dirSize < bestCandidate.dirSize) bestCandidate.dirSize = folder.dirSize;
    }
    Object.keys(folder.directories).forEach((dir) => {
        findDir(folder.directories[dir]);
    });
};
findDir(fileTree);
console.log(`secound answer: ${bestCandidate.dirSize}`);
