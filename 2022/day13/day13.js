const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

const correctArray = []
let correctValue = 0;

for(let index = 0; index < array.length; index+= 3) {
    let left = JSON.parse(array[index]);
    let right = JSON.parse(array[index+1]);

    let indexValue = (index / 3) + 1;

    if (compareValues(left, right)) {
        let indexValue = (index / 3) + 1;
        correctArray.push(indexValue);
        correctValue += indexValue;
        console.log(`${indexValue} - Correc [${index + 1}]`);
    } else {
        console.log(`${indexValue} - Incorrec`);
    }
}

console.log(correctArray);
console.log(correctValue);

console.log("part two");

const jsonData = [];
for(let index = 0; index < array.length; index++) {
    if (array[index] != '') {
        jsonData.push(JSON.parse(array[index]));
    }
}
jsonData.push([[6]]);
jsonData.push([[2]]);

jsonData.sort(sortFunction);

let firstIndex = 0;
let secondIndex = 0;
for(let finalIndex = 0; finalIndex < jsonData.length; finalIndex++) {
    let stringData = JSON.stringify(jsonData[finalIndex]);
    console.log(stringData)
    if (stringData == "[[2]]") {
        firstIndex = finalIndex + 1;
    }
    if (stringData == "[[6]]") {
        secondIndex = finalIndex + 1;
    }
}

console.log(firstIndex);
console.log(secondIndex);
console.log(firstIndex * secondIndex);

function compareValues(leftValue, rightValue) {
    // I gave up on this one. I tried my own and it did not work AT ALL.
    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
		return leftValue > rightValue ? false : leftValue < rightValue ? true : undefined;
	} else if (Array.isArray(leftValue) !== Array.isArray(rightValue)) {
		return compareValues(Array.isArray(leftValue) ? leftValue : [leftValue], Array.isArray(rightValue) ? rightValue : [rightValue]);
	}

	for (let i = 0, end = Math.max(leftValue.length, rightValue.length); i < end; i++) {
		if (leftValue[i] === undefined) return true;
		if (rightValue[i] === undefined) return false;
		const result = compareValues(leftValue[i], rightValue[i]);
		if (result !== undefined) return result;
	}
	return undefined;
}

function sortFunction(a, b) {
    const sortResult = compareValues(a, b);
    return sortResult === undefined ? 0 : sortResult ? -1 : 1;
}