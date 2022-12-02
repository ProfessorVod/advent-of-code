const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let winPointArray = [];
winPointArray["X"] = 1;
winPointArray["Y"] = 2;
winPointArray["Z"] = 3;

let winArray = [];
winArray["A"] = "Y";
winArray["B"] = "Z";
winArray["C"] = "X";

let drawArray = [];
drawArray["A"] = "X";
drawArray["B"] = "Y";
drawArray["C"] = "Z";

let lossArray = [];
lossArray["A"] = "Z";
lossArray["B"] = "X";
lossArray["C"] = "Y";

let totalPoints = 0;

for(const arrayItem in array) {
    let itemParts = array[arrayItem].split(" ");
    let points = getPoints(itemParts[0], itemParts[1]);
    totalPoints += points;
}

console.log(totalPoints)

function getPoints(opponent, strategy) {
    if (strategy == "X") {
        // LOSE
        return winPointArray[lossArray[opponent]] + 0;
    } else if (strategy == "Y") {
        // DRAW
        return winPointArray[drawArray[opponent]] + 3;        
    } else {
        // WIN
        return winPointArray[winArray[opponent]] + 6;
    }
}

/*
A X Rock
B Y Paper
C Z Scissors

0 Loss 3 Draw 6 Win
*/