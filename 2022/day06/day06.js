const fs = require('fs');

// const windowSize = 4; This was day
const windowSize = 14;

let array = fs.readFileSync('data.txt').toString().split("\n");
const data = array[0];

console.log(data);

for(let dataIndex = 0; dataIndex < data.length - windowSize + 1; dataIndex++) {
    var substring = data.substring(dataIndex, dataIndex + windowSize);
    //console.log(substring);
    let packetStart = true;
    for (let index = 0; index < substring.length - 1; index++) {
        if (substring.indexOf(substring[index], index + 1) > -1) {
            packetStart = false
        } 
    }
    if (packetStart) {
        console.log(dataIndex + windowSize); //ADD SOMETHING TO THIS
        break;
    }
}