const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

const forest = parseArray(array);

const forestWidth = forest[0].length;
const forestHeight = forest.length;

const outsideTrees = (forestWidth * 2) + (forestHeight * 2) - 4;

let innerTrees = 0;
let scenicScore = 0;

// This is the ad way to do this.
for(let indexY = 1; indexY < forestHeight - 1; indexY++) {
    for(let indexX = 1; indexX < forestWidth - 1; indexX++) {
        const treeHeight = forest[indexY][indexX].height;
        // NORTH
        let visibleNorth = true;
        let treeNorth = 0;
        for (let tempIndex = indexY - 1; tempIndex >= 0; tempIndex--) {
            if (visibleNorth) {
                treeNorth++;
            }
            const compareHeight = forest[tempIndex][indexX].height;
            visibleNorth = visibleNorth && (treeHeight > compareHeight);
        }

        // SOUTH
        let visibleSouth = true;
        let treeSouth = 0;
        for (let tempIndex = indexY + 1; tempIndex < forestHeight; tempIndex++) {
            if (visibleSouth) {
                treeSouth++;
            }
            const compareHeight = forest[tempIndex][indexX].height;
            visibleSouth = visibleSouth && (treeHeight > compareHeight);
        }

        // EAST
        let visibleEast = true;
        let treeEast = 0;
        for (let tempIndex = indexX + 1; tempIndex < forestWidth; tempIndex++) {
            if (visibleEast) {
                treeEast++;
            }
            const compareHeight = forest[indexY][tempIndex].height;
            visibleEast = visibleEast && (treeHeight > compareHeight)
        }

        // WEST
        let visibleWest = true;
        let treeWest = 0;
        for (let tempIndex = indexX - 1; tempIndex >= 0; tempIndex--) {
            if (visibleWest) {
                treeWest++;
            }
            const compareHeight = forest[indexY][tempIndex].height;
            visibleWest = visibleWest && (treeHeight > compareHeight)
        }

        forest[indexY][indexX].visible = (visibleNorth || visibleSouth || visibleEast || visibleWest)
        if (forest[indexY][indexX].visible) {
            innerTrees++;
        }

        const thisScenic = treeEast * treeNorth * treeSouth * treeWest;
        if (thisScenic > scenicScore) {
            scenicScore = thisScenic;
        }
    }
}

//console.log(forest);

console.log(innerTrees + outsideTrees);

console.log(scenicScore);

function parseArray(dataArray) {
    let forestArray = [];
    for(let dataArrayIndex = 0; dataArrayIndex < dataArray.length; dataArrayIndex++) {
        let forestArrayLine = [];
        const dataArrayItem = dataArray[dataArrayIndex];
        for (let elementIndex = 0; elementIndex < dataArrayItem.length; elementIndex++) {
            const elementNumber = Number(dataArrayItem[elementIndex]);
            let tree = {
                height: elementNumber,
                visibleNorth: false,
                visibleSouth: false,
                visibleEast: false,
                visibleWest: false,
                visible: false,
                posX: elementIndex,
                posY: dataArrayIndex
            };

            if (dataArrayIndex == 0) {
                tree.visibleNorth = true;
                tree.visible = true;
            } else {
                const compareNumber = Number(dataArray[dataArrayIndex-1][elementIndex]);
                if (compareNumber < elementNumber) {
                    tree.visibleNorth = true;
                }
            }

            if (dataArrayIndex == dataArray.length - 1) {
                tree.visibleSouth = true;
                tree.visible = true;
            } else {
                const compareNumber = Number(dataArray[dataArrayIndex+1][elementIndex]);
                if (compareNumber < elementNumber) {
                    tree.visibleSouth = true;
                }
            }

            if (elementIndex == 0) {
                tree.visibleWest = true;
                tree.visible = true;
            } else {
                const compareNumber = Number(dataArray[dataArrayIndex][elementIndex-1]);
                if (compareNumber < elementNumber) {
                    tree.visibleWest = true;
                }
            }

            if (elementIndex == dataArrayItem.length - 1) {
                tree.visibleEast = true;
                tree.visible = true;
            } else {
                const compareNumber = Number(dataArray[dataArrayIndex][elementIndex+1]);
                if (compareNumber < elementNumber) {
                    tree.visibleEast = true;
                }
            }

            forestArrayLine.push(tree);
        }
        forestArray.push(forestArrayLine);
    }
    return forestArray;
}

function checkATree(forestArray, posX, posY) {
    // Check Up
    // Check Down
    // Check Left
    // Check Right
}