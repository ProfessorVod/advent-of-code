const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let priorityTotal = 0;

const priorityScore = getPriorityScore();

for(let index = 0; index <= array.length - 3; index += 3) {
    const firstBag = array[index];
    const secondBag = array[index + 1];
    const thirdBag = array[index + 2];
    
    const firstBagItems = firstBag.split('');
    let foundItem = '{NONE}';
    for(let firstBagItemIdex in firstBagItems) {
        const item = firstBagItems[firstBagItemIdex];
        if (secondBag.indexOf(item) >= 0 && thirdBag.indexOf(item) >= 0) {
            priorityTotal += priorityScore[item];
            foundItem = item;
            break;
        }
    }
    console.log(`${index + 1} - ${firstBag} - ${secondBag} - ${thirdBag} - ${foundItem}`)
}

console.log(priorityTotal);

// (temp.match(/is/g) || []).length;

function getPriorityScore() {
    let priorityScore = []

    priorityScore['a'] = 1;
    priorityScore['b'] = 2;
    priorityScore['c'] = 3;
    priorityScore['d'] = 4;
    priorityScore['e'] = 5;
    priorityScore['f'] = 6;
    priorityScore['g'] = 7;
    priorityScore['h'] = 8;
    priorityScore['i'] = 9;
    priorityScore['j'] = 10;
    priorityScore['k'] = 11;
    priorityScore['l'] = 12;
    priorityScore['m'] = 13;
    priorityScore['n'] = 14;
    priorityScore['o'] = 15;
    priorityScore['p'] = 16;
    priorityScore['q'] = 17;
    priorityScore['r'] = 18;
    priorityScore['s'] = 19;
    priorityScore['t'] = 20;
    priorityScore['u'] = 21;
    priorityScore['v'] = 22;
    priorityScore['w'] = 23;
    priorityScore['x'] = 24;
    priorityScore['y'] = 25;
    priorityScore['z'] = 26;
    priorityScore['A'] = 27;
    priorityScore['B'] = 28;
    priorityScore['C'] = 29;
    priorityScore['D'] = 30;
    priorityScore['E'] = 31;
    priorityScore['F'] = 32;
    priorityScore['G'] = 33;
    priorityScore['H'] = 34;
    priorityScore['I'] = 35;
    priorityScore['J'] = 36;
    priorityScore['K'] = 37;
    priorityScore['L'] = 38;
    priorityScore['M'] = 39;
    priorityScore['N'] = 40;
    priorityScore['O'] = 41;
    priorityScore['P'] = 42;
    priorityScore['Q'] = 43;
    priorityScore['R'] = 44;
    priorityScore['S'] = 45;
    priorityScore['T'] = 46;
    priorityScore['U'] = 47;
    priorityScore['V'] = 48;
    priorityScore['W'] = 49;
    priorityScore['X'] = 50;
    priorityScore['Y'] = 51;
    priorityScore['Z'] = 52;

    return priorityScore;
}