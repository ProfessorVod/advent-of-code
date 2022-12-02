const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let winArray = [];
winArray["A"] = "Y";
winArray["B"] = "Z";
winArray["C"] = "X";

let winPointArray = [];
winPointArray["X"] = 1;
winPointArray["Y"] = 2;
winPointArray["Z"] = 3;

let drawArray = [];
drawArray["A"] = "X";
drawArray["B"] = "Y";
drawArray["C"] = "Z";

let totalPoints = 0;

for(const arrayItem in array) {
    let itemParts = array[arrayItem].split(" ");
    let points = getPoints(itemParts[0], itemParts[1]);
    totalPoints += points;
}

console.log(totalPoints)

function getPoints(opponent, strategy) {
    if (strategy == winArray[opponent]) {
        return winPointArray[strategy] + 6;
    } else if (strategy == drawArray[opponent]) {
        return winPointArray[strategy] + 3;
    } else {
        return winPointArray[strategy] + 0;
    }
}

/*
A X Rock
B Y Paper
C Z Scissors

0 Loss 3 Draw 6 Win
*/