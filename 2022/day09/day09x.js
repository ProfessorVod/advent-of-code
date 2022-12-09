const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let interractive = true;

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
    x: 11,//85,
    y: 15//104
}

let tailArray = []
for (let ind = 0; ind < 9; ind++) {
    tailArray[ind] = {
        x: headLocation.x,
        y: headLocation.y,
    }
}

const tempWidth = 26;
const tempHeight = 21;

console.log(tailArray);

visited[getIndexString(headLocation.x,headLocation.y)] = 1;
let visitedCount = 1;

for(const instructionIndex in array) {
    const instruction = array[instructionIndex];
    const instructionSplit = instruction.split(' ');
    const direction = instructionSplit[0];
    const numberToMove = Number(instructionSplit[1]);

    for (let moveIndex = 0; moveIndex < numberToMove; moveIndex++) {
        moveHead(headLocation, direction);
        moveTrail(tailArray[0], headLocation)
        // for (let tail in tailArray) {
        for (let tailIndex = 1; tailIndex < tailArray.length; tailIndex++) {
            moveTrail(tailArray[tailIndex], tailArray[tailIndex - 1]);
            if (tailIndex == tailArray.length - 1) {
                let tailLocation = tailArray[tailIndex];
                if (visited[getIndexString(tailLocation.x,tailLocation.y)] == undefined || visited[getIndexString(tailLocation.x,tailLocation.y)] == NaN) {
                    visited[getIndexString(tailLocation.x,tailLocation.y)] = 0;
                    visitedCount++;
                }
                visited[getIndexString(tailLocation.x,tailLocation.y)] += 1;
            }
        }    
    }
    if (interractive) {
        console.log("=========================")
        for(let j = 0; j < tempHeight; j++) {
            let debugLine = "";
            for (let i = 0; i < tempWidth; i++) {
                let debugBit = ".";
                if (headLocation.x == i && headLocation.y == j) {
                    debugBit = 'H';
                }
                for (let tailoIndex in tailArray) {
                    const tailoItem = tailArray[tailoIndex];
                    if (debugBit == '.' && tailoItem.x == i && tailoItem.y == j) {
                        debugBit = tailoIndex;
                    }
                }
                debugLine = `${debugLine}${debugBit}`;
            }
            console.log(debugLine);
        }
        //console.log(tailArray);
    }
}

//console.log(visited);
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
    /*if (headLocation.y < tailLocation.y - 1) {
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
    }*/
    const stepX = headLocation.x - tailLocation.x;
    const stepY = headLocation.y - tailLocation.y;

    if (Math.abs(stepX) <= 1 && Math.abs(stepY) <= 1) {
        return;
    }

    tailLocation.x += Math.sign(stepX);
    tailLocation.y += Math.sign(stepY);

    /*
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
    }*/
}

