const fs = require('fs');

let array = fs.readFileSync('data.txt').toString().split("\n");

const mountain = []

let startPos = {x:0, y: 0};

const endPos = {x:0, y:0};

const startPositions = [];

for(let arrayIndex in array) {
    const currentItem = array[arrayIndex];
    const currentRow = [];
    for (let innerItemindex = 0; innerItemindex < currentItem.length; innerItemindex++) {
        if (currentItem[innerItemindex] == "S") {
            startPos.x = innerItemindex;
            startPos.y = Number(arrayIndex);
            currentRow.push(1);
        } else if (currentItem[innerItemindex] == "E") {
            endPos.x = innerItemindex;
            endPos.y = Number(arrayIndex);
            currentRow.push(27);
        } else {
            let currentChar = currentItem[innerItemindex].charCodeAt(0) - 96;
            if (currentItem[innerItemindex] == "a") {
                startPositions.push({x: innerItemindex, y: arrayIndex});
            }
            currentRow.push(currentChar);
        }
    }
    mountain.push(currentRow);
}

let start = null;
let end = null;

console.log(mountain);
console.log(startPos);
console.log(endPos);

let cols = mountain.length; //columns in the grid
let rows = mountain[0].length; //rows in the grid

let grid = new Array(cols); //array of all the grid points



//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

//constructor function to create all the grid points as objects containind the data for the points
function GridPoint(x, y) {
  this.x = x; //x location of the grid point
  this.y = y; //y location of the grid point
  this.f = 0; //total cost function
  this.g = 0; //cost function from start to the current grid point
  this.h = 0; //heuristic estimated cost function from current grid point to the goal
  this.neighbors = []; // neighbors of the current grid point
  this.parent = undefined; // immediate source of the current grid point

  // update neighbors array for a given grid point
  this.updateNeighbors = function (grid) {
    let i = this.x;
    let j = this.y;
    if (i < cols - 1 && canMove(mountain[i][j], mountain[i+1][j])) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0 && canMove(mountain[i][j], mountain[i-1][j])) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1 && canMove(mountain[i][j], mountain[i][j+1])) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0 && canMove(mountain[i][j], mountain[i][j-1])) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

function canMove(currentNumber, nextNumber) {
    return nextNumber <= currentNumber + 1;
}

//initializing the grid
function init(openSet) {
  //making a 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateNeighbors(grid);
    }
  }

  start = grid[startPos.y][startPos.x];
  end = grid[endPos.y][endPos.x];

  openSet.push(start);
}

//A star search implementation

function search(searchForStart) {
    let openSet = []; //array containing unevaluated grid points
    let closedSet = []; //array containing completely evaluated grid points

    start = null; //starting grid point
    end = null; // ending grid point (goal)
    let path = [];
    init(openSet);
    while (openSet.length > 0) {
        //assumption lowest index is the first one to begin with
        //console.log(openSet);
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = openSet[lowestIndex];

        if (current.x === end.x && current.y === end.y) {
            let temp = current;
            path.push(temp);
            while (temp.parent) {
                path.push(temp.parent);
                temp = temp.parent;
            }
            console.log("DONE!");
            // return the traced path
            return path.reverse();
        }

        //remove current from openSet
        openSet.splice(lowestIndex, 1);
        //add current to closedSet
        closedSet.push(current);

        let neighbors = current.neighbors;

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor)) {
                let possibleG = current.g + 1;

                if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
                } else if (possibleG >= neighbor.g) {
                continue;
                }

                neighbor.g = possibleG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
    }

    //no solution by default
    return [];
}

let results = search(false);

console.log(startPositions);

let minimum = 99999;
startPositions.forEach(element => {
    startPos = element;
    let betterResults = search();
    if (betterResults.length < minimum && betterResults.length > 0) {
        minimum = betterResults.length;
    }
});

console.log(results.length - 1);
console.log(minimum - 1);