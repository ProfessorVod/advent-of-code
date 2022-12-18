const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

let cycles = [];

let xRegister = 1

for (let instructionIndex in array) {
    const instruction = array[instructionIndex];

    const splitInstruction = instruction.split(' ');

    switch(splitInstruction[0]) {
        case "noop":
            cycles.push(xRegister);
            break;
        case "addx":
            cycles.push(xRegister);
            cycles.push(xRegister);
            xRegister = xRegister + Number(splitInstruction[1]);
            break;
    }
}

//console.log(cycles);

calculateSignalStrength(cycles);
drawCrt(cycles);

function calculateSignalStrength(cycleArray) {
    const cyclesOfInterest = [20,60,100,140,180,220];

    let signalStrength = 0;
    for (let index = 0; index < cycleArray.length; index++) {
        const adjustedCycleIndex = index + 1;
        if (cyclesOfInterest.indexOf(adjustedCycleIndex) >= 0) {
            const strength = (adjustedCycleIndex * cycleArray[index]);
            //console.log(`${adjustedCycleIndex} - ${strength}`);
            signalStrength = signalStrength + strength;
        }
    }
    console.log(signalStrength);
}

function drawCrt(cycleArray) {
    const crtArray = [];
    for (let crtIndex = 0; crtIndex < 240; crtIndex++) {
        const cycleValue = cycleArray[crtIndex];
        const cycleRework = crtIndex % 40;
        const adjustedCrt = cycleRework;

        let pixel = "."
        if (adjustedCrt >= cycleValue - 1 && adjustedCrt <= cycleValue + 1) {
            pixel = "#";
        }
        crtArray.push(pixel);
        console.log(`cycle ${crtIndex + 1} - ${cycleValue}`);
    }
    console.log(crtArray);

    for (let y = 0; y < 6; y++) {
        let consoleLine = "";
        for (let x = 0; x < 40; x++) {
            const pixelLocation = x + (y * 40);
            consoleLine += crtArray[pixelLocation];
        }
        console.log(consoleLine);
    }
}