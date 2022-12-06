const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let withinCount = 0;
let overlapCount = 0;

for(const arrayIndex in array) {
    const arrayItem = array[arrayIndex];
    const parsedInstructions = parseData(arrayItem);
    // console.log(parsedInstructions);
    const within = isWithin(parsedInstructions.lowA, parsedInstructions.highA, parsedInstructions.lowB, parsedInstructions.highB);
    if (within) {
        console.log(arrayItem);
        withinCount += 1;
    }

    const doesOverlap = overlaps(parsedInstructions.lowA, parsedInstructions.highA, parsedInstructions.lowB, parsedInstructions.highB);
    if (doesOverlap) {
        overlapCount += 1;
    }
}

console.log(withinCount);
console.log(overlapCount);

function parseData(item) {
    let itemParts = item.split(",");
    let splitOne = itemParts[0].split("-");
    let splitTwo = itemParts[1].split("-");
    return { 
        lowA: Number(splitOne[0]),
        highA: Number(splitOne[1]),
        lowB: Number(splitTwo[0]),
        highB: Number(splitTwo[1])
    };
}

function isWithin(firstLow, firstHigh, secondLow, secondHigh) {
    const firstCheck = (firstLow >= secondLow && firstHigh <= secondHigh);
    const secondCheck = (secondLow >= firstLow && secondHigh <= firstHigh);
    return (firstLow >= secondLow && firstHigh <= secondHigh)
        || (secondLow >= firstLow && secondHigh <= firstHigh);
}

function overlaps(firstLow, firstHigh, secondLow, secondHigh) {
    const firstCheck = (firstLow <= secondHigh && firstHigh >= secondLow);
    const secondCheck = (secondLow <= firstHigh && secondHigh >= firstLow);
    return firstCheck || secondCheck;
}