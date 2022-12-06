const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let createSlotIndex = getCreateSlotIndex(array);

const slotLine = array[createSlotIndex];
const slotArray = slotLine.trim().split('   ');

const totalSlots = slotArray.length;

let crateSlots = [];
for(let slotArrayIndex in slotArray) {
    crateSlots[slotArrayIndex] = {
        crateIndex: slotArray[slotArrayIndex],
        crates: []
    }
}

// parse the data.
for (let lineIndex = createSlotIndex - 1; lineIndex >= 0; lineIndex--) {
    let splitRow = array[lineIndex].split('');

    let trueIndex = 0; // Doing this because javascript hates numbers.
    for(let rowIndex = 1; rowIndex < splitRow.length; rowIndex += 4) {
        if (splitRow[rowIndex] != ' ') {
            crateSlots[trueIndex].crates.push(splitRow[rowIndex]);
        }
        trueIndex++;
    }
}

console.log(crateSlots);

// NOW DO THE INSTRUCTIONS!
for(let instructionIndex = createSlotIndex + 2; instructionIndex < array.length; instructionIndex++) {
    const instruction = array[instructionIndex];
    const instructionData = splitInstructions(instruction);

    for(let cratesToMoveIndex = 1; cratesToMoveIndex <= instructionData.cratesToMove; cratesToMoveIndex++) {
        let crateLetter = crateSlots[instructionData.origin - 1].crates.pop();
        crateSlots[instructionData.destination - 1].crates.push(crateLetter);
    }
    console.log(crateSlots);
}

// NOW GET THE LAST LETTERS;
let resultString = "";
for(let resultCrateIndex in crateSlots) {
    let currentCrate = crateSlots[resultCrateIndex];
    resultString = resultString + currentCrate.crates[currentCrate.crates.length - 1];
}
console.log(resultString);

function splitInstructions(instruction) {
    const firstSplit = String(instruction).substring(5).split(' from ');
    const secondSplit = firstSplit[1].split(' to ');

    let instructionData = {
        cratesToMove: Number(firstSplit[0]),
        origin: Number(secondSplit[0]),
        destination: Number(secondSplit[1])
    }
    return instructionData;
}

function getCreateSlotIndex(dataArray) {
    for(let index = 0; index < dataArray.length; index++) {
        if (dataArray[index].startsWith(" 1   2")) {
            return index;
        }
    }
}