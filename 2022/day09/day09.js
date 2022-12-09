const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

/*
const arrayWidth = 1000;
const arrayHeight = 1000;

const data = [];


for (let j = 0; j < arrayHeight; j++) {
    let iteration = [];
    for (let i = 0; i < arrayWidth; j++) {
        iteration.push(0);
    }
    data.push(iteration);
}*/

const visited = {};

const headLocation = {
    x: 50,
    y: 50
}

const tailLocation = {
    x: headLocation.x,
    y: headLocation.y,
}

visited[getIndexString(headLocation.x,headLocation.y)] = 1;
let visitedCount = 1;

for(const instructionIndex in array) {
    const instruction = array[instructionIndex];
    const instructionSplit = instruction.split(' ');
    const direction = instructionSplit[0];
    const numberToMove = Number(instructionSplit[1]);

    for (let moveIndex = 0; moveIndex < numberToMove; moveIndex++) {
        moveHead(headLocation, direction);
        moveTrail(tailLocation, headLocation);
        console.log(`(${headLocation.x},${headLocation.y}) - (${tailLocation.x},${tailLocation.y})`);
        if (visited[getIndexString(tailLocation.x,tailLocation.y)] == undefined || visited[getIndexString(tailLocation.x,tailLocation.y)] == NaN) {
            visited[getIndexString(tailLocation.x,tailLocation.y)] = 0;
            visitedCount++;
        }
        visited[getIndexString(tailLocation.x,tailLocation.y)] += 1;
    }
}

console.log(visited);
console.log(visitedCount);

function getIndexString(posX, posY) {
    return `(${posX},${posY})`;
}

function moveHead(head, direction) {
    switch (direction) {
        case "R":
            head.x++;
            break;
        case "D":
            head.y++;
            break;
        case "L":
            head.x--;
            break;
        case "U":
            head.y--;
            break;
    }
}

function moveTrail(tailLocation, headLocation) {
    if (headLocation.y < tailLocation.y - 1) {
        // Head Above
        tailLocation.y--;
        
        if (headLocation.x != tailLocation.x) {
            tailLocation.x = tailLocation.x + (headLocation.x - tailLocation.x);
        }
    } else if (headLocation.y > tailLocation.y + 1) {
        // Head Below
        tailLocation.y++;
        if (headLocation.x != tailLocation.x) {
            tailLocation.x = tailLocation.x + (headLocation.x - tailLocation.x);
        }
    }

    if (headLocation.x < tailLocation.x - 1) {
        // Head Above
        tailLocation.x--;

        if (headLocation.y != tailLocation.y) {
            tailLocation.y = tailLocation.y + (headLocation.y - tailLocation.y);
        }
    } else if (headLocation.x > tailLocation.x + 1) {
        // Head Below
        tailLocation.x++;

        if (headLocation.y != tailLocation.y) {
            tailLocation.y = tailLocation.y + (headLocation.y - tailLocation.y);
        }
    }
}

