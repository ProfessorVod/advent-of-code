const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let monkeys = parseMonkeys(array);

let modulo = 1
modulo = monkeys.reduce((a, b) => a * b.divisibleBy, 1);
console.log(modulo);


const iterations = 10000;//20;

for(let currentIteration = 0; currentIteration < iterations; currentIteration++) {
    for (let monkeyIndex in monkeys) {
        const currentMonkey = monkeys[monkeyIndex];
        if (currentMonkey.items.length > 0) {
            for(let itemIndex = 0; itemIndex < currentMonkey.items.length; itemIndex++) {
                let worryLevel = Number(currentMonkey.items[itemIndex]);
                let newWorryLevel = calculateWorryLevel(currentMonkey.operation, worryLevel);
                newWorryLevel = newWorryLevel % modulo;
                currentMonkey.inspectionCount++;
                if(newWorryLevel % currentMonkey.divisibleBy == 0) {
                    monkeys[currentMonkey.trueMonkey].items.push(newWorryLevel);
                } else {
                    monkeys[currentMonkey.falseMonkey].items.push(newWorryLevel);
                }
            }
            currentMonkey.items = [];
        }
    }
}

console.log(monkeys);

getMonkeyBusiness(monkeys);

function parseMonkeys(monkeyData) {
    const returnMonkeys = []
    for(let index = 0; index <= monkeyData.length; index += 7) {
        const monkeyNumber = monkeyData[index].substring(7, 8);
        const startingItems = monkeyData[index + 1].substring(18, monkeyData[index + 1].length);
        const items = [];
        startingItems.split(', ').forEach(element => {
            items.push(Number(element));
        });
        const operation = monkeyData[index + 2].substring(19, monkeyData[index + 2].length);
        const divisibleBy = Number(monkeyData[index + 3].substring(21, monkeyData[index + 3].length));
        const trueMonkey = monkeyData[index + 4].substring(29, monkeyData[index + 4].length);
        const falseMonkey = monkeyData[index + 5].substring(30, monkeyData[index + 5].length);

        const currentMonkey = {
            number: monkeyNumber,
            items: items,
            operation: operation,
            divisibleBy: divisibleBy,
            trueMonkey: Number(trueMonkey),
            falseMonkey: Number(falseMonkey),
            inspectionCount: 0
        }

        returnMonkeys.push(currentMonkey);
    }
    return returnMonkeys;
}

function calculateWorryLevel(operation, worryLevel) {
    const splitOperation = operation.split(' ');
    let valueOne = 0;
    let valueTwo = 0;

    if (splitOperation[0] == "old") {
        valueOne = worryLevel;
    } else {
        valueOne = Number(splitOperation[0]);
    }

    if (splitOperation[2] == "old") {
        valueTwo = worryLevel;
    } else {
        valueTwo = Number(splitOperation[2]);
    }

    switch(splitOperation[1]) {
        case "+":
            return valueOne + valueTwo;
        case "*":
            return valueOne * valueTwo;
    }
}

function getMonkeyBusiness(monkeyList) {
    let monkeyBusiness = [];
    for (let currentMonkey in monkeyList) {
        monkeyBusiness.push(monkeyList[currentMonkey].inspectionCount);
    }

    monkeyBusiness = monkeyBusiness.sort(function(a, b){return a - b});
    monkeyBusiness.reverse();
    console.log(monkeyBusiness[0] * monkeyBusiness[1]);
}