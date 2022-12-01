const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let elves = [];

let calorieCount = 0;
let elfCount = 0;

for (let index = 0; index < array.length; index++) {
    let logCalories = false;

    if (array[index] != 0 || array[index] != "") {
        calorieCount += Number(array[index]);
    }
    else {
        logCalories = true;
    }

    if (index + 1 == array.length){
        logCalories = true;
    }

    if (logCalories) {
        elves[elfCount] = calorieCount;

        elfCount++;
        calorieCount = 0;
    }
}

let sortedElves = elves.sort(sortFunction);


for(let elf in elves){
    console.log(elves[elf]);
}

console.log(`Top Elf ${sortedElves[0]}`);

const topScores = sortedElves[0] + sortedElves[1] + sortedElves[2];

console.log(`Top 3 Elves ${topScores}`);

function sortFunction(a, b) {
    const numA = Number(a);
    const numB = Number(b);

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    } else {
        return 0;
    }
}