const list = document.querySelector('pre').innerText;

for (let i = 0; i < list.length; i++) {
    const arr = list.substring(i, i + 4).split('');
    if (new Set(arr).size === 4) {
        console.log(`first answer: ${arr[0]}${arr[1]}${arr[2]}${arr[3]} at index ${i + 4}`);
        break;
    }
}

for (let i = 0; i < list.length; i++) {
    const arr = list.substring(i, i + 14).split('');
    if (new Set(arr).size === 14) {
        console.log(`secound answer: ${arr.join('')} at index ${i + 14}`);
        break;
    }
}
