const fs = require('fs');

// const windowSize = 4; This was day
const windowSize = 14;

let array = fs.readFileSync('data.txt').toString().split("\n");

const directories = {};
let parentDirectory = null;
let currentDirectory = "/";

directories[currentDirectory] = {
    name: currentDirectory,
    size: 0,
    selfSize: 0,
    parent: null,
    fullPath: "/",
    childDirectories: [],
    files: []
};

console.log(currentDirectory)

for(let consoleIndex in array) {
    const consoleLine = array[consoleIndex];
    if (consoleLine.startsWith("$")) {
        const subCommand = consoleLine.substring(2);
        if (subCommand.startsWith("cd")) {
            const subCommandSplit = subCommand.split(" ");
            const directoryName = subCommandSplit[1];
            if (directoryName == "..") {
                currentDirectory = directories[currentDirectory].parent;
            } else {
                if (directoryName != "/") {
                    let fullCurrentDirectory = `${currentDirectory}/${directoryName}`;
                    //currentDirectory = directoryName;
                    currentDirectory = fullCurrentDirectory;
                }  
            }
        }
    } else {
        const fileSplit = consoleLine.split(" ");
        
        if (fileSplit[0] == "dir") {
            let directoryName = fileSplit[1];
            let fullDirectoryName = `${currentDirectory}/${directoryName}`;
            console.log(fullDirectoryName);
            //directories[directoryName] = {
            directories[fullDirectoryName] = {
                name: directoryName,
                size: 0,
                selfSize: 0,
                parent: currentDirectory,
                childDirectories: [],
                files: []
            };
            console.log(currentDirectory);
            directories[currentDirectory].childDirectories.push(directoryName)
        }
        else {
            const directoryObject = directories[currentDirectory];
            directoryObject.files.push(fileSplit[1]);

            let loopyDirectory = currentDirectory;
            const size = Number(fileSplit[0]);
            directoryObject.selfSize += size;

            
            while (loopyDirectory != null) {
                let currentLoop = directories[loopyDirectory];
                currentLoop.size += size;
                loopyDirectory = currentLoop.parent;
            }
        }
    }
}

console.log(directories);

let directorySize = 0;
const limit = 100000;

// First one:
for(let dirIndex in directories) {
    const runThroughDirectory = directories[dirIndex];
    if (runThroughDirectory.size <= limit) {
        directorySize += runThroughDirectory.size;
    }
}

console.log(directorySize);


// Second One:
const bigSize = 70000000;
const neededSpace = 30000000;
const remainingSpace = bigSize - neededSpace;


let validSizes = [];
for(let dirIndex in directories) {
    const runThroughDirectory = directories[dirIndex];
    const size = bigSize - runThroughDirectory.size;
    const requiredSize = 30000000 - (70000000 - directories["/"].size);
    if (runThroughDirectory.size >= requiredSize) {
        validSizes.push(runThroughDirectory.size);
    }
}
validSizes.sort();
console.log(validSizes);
