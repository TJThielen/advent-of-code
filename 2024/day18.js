import fs from 'fs';

var input = fs.readFileSync('./day18Input.txt', 'utf8');
//input = fs.readFileSync('./testinput.txt', 'utf8');
const rows = input.split('\n');
const MAP_SIZE = 70;
const map = [];
for(let i = 0; i <= MAP_SIZE; i++){
    const arr = [];
    for(let j = 0; j <= MAP_SIZE; j++){
        arr.push(0);
    }
    map.push(arr);
}

for(let i = 0; i < 2903; i++){
    const coord = rows[i].split(',');
    map[parseInt(coord[1])][parseInt(coord[0])] = 1;
    if(i == 2902){
        console.log(coord);
    }
}
//console.log(map);
console.log(canEscape(map));

function getSteps(map){
    let steps = 0;
    let options = [[0,0]];

    while(true){
        steps++;
        const nextOptions = [];
        options.forEach(e => {
            const x = e[0];
            const y = e[1];
            if(x+1 <= MAP_SIZE && x+1 >= 0 && map[x+1][y] == 0){
                if(!arrayIncludes(nextOptions, [x+1, y])){
                    nextOptions.push([x+1, y]);
                }
            }
            if(x-1 <= MAP_SIZE && x-1 >= 0 && map[x-1][y] == 0){
                if(!arrayIncludes(nextOptions, [x-1, y])){
                    nextOptions.push([x-1, y]);
                }
            }
            if(y+1 <= MAP_SIZE && y+1 >= 0 && map[x][y+1] == 0){
                if(!arrayIncludes(nextOptions, [x, y+1])){
                    nextOptions.push([x, y+1]);
                }
            }
            if(y <= MAP_SIZE && y-1 >= 0 && map[x][y-1] == 0){
                if(!arrayIncludes(nextOptions, [x, y-1])){
                    nextOptions.push([x, y-1]);
                }
            }
            map[x][y] = 1;
        });
        if(arrayIncludes(nextOptions, [MAP_SIZE,MAP_SIZE])){
            return steps;
        }
        
        options = nextOptions;
    }
}

function canEscape(map){
    let options = [[0,0]];

    while(true){
        const nextOptions = [];
        options.forEach(e => {
            const x = e[0];
            const y = e[1];
            if(x+1 <= MAP_SIZE && x+1 >= 0 && map[x+1][y] == 0){
                if(!arrayIncludes(nextOptions, [x+1, y])){
                    nextOptions.push([x+1, y]);
                }
            }
            if(x-1 <= MAP_SIZE && x-1 >= 0 && map[x-1][y] == 0){
                if(!arrayIncludes(nextOptions, [x-1, y])){
                    nextOptions.push([x-1, y]);
                }
            }
            if(y+1 <= MAP_SIZE && y+1 >= 0 && map[x][y+1] == 0){
                if(!arrayIncludes(nextOptions, [x, y+1])){
                    nextOptions.push([x, y+1]);
                }
            }
            if(y <= MAP_SIZE && y-1 >= 0 && map[x][y-1] == 0){
                if(!arrayIncludes(nextOptions, [x, y-1])){
                    nextOptions.push([x, y-1]);
                }
            }
            map[x][y] = 1;
        });
        if(arrayIncludes(nextOptions, [MAP_SIZE,MAP_SIZE])){
            return true;
        }
        if(nextOptions.length == 0){
            return false;
        }
        options = nextOptions;
    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

function arrayIncludes(arrayOfArrays, targetArray) {
    return arrayOfArrays.some(subArray => arraysAreEqual(subArray, targetArray));
}