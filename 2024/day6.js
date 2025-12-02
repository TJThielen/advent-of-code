import fs from 'fs'

var input = fs.readFileSync('./2024AdventOfCodeDay6Input.txt').toString();
//input = fs.readFileSync('./testInput.txt').toString();
const rows = input.split('\n');
let x = -1;
let y = -1;
let map = [];
let xys = [];
let xys2 = [];

for(const row in rows){
    let arr = [];
    for(const char in rows[row]){
        arr.push(rows[row][char]);
        if(rows[row][char] == '^'){
            x = row;
            y = char;
        }
    }
    map.push(arr);
}

let ogMap = copy(map);
ogMap[47][74] = '#';
isLoop(ogMap,x, y, 47, 74, xys);
let counter = 0;
for(const row in ogMap){
    for(const char in ogMap[row]){
        if(Number.isInteger(ogMap[row][char]) && row != 69 && char != 74){
            let newMap = copy(map);
            newMap[row][char] = '#';
            if(isLoop(newMap, x, y, row, char, xys)){
                counter++;
            }
        }
    }
}

for(const row in ogMap){
    for(const char in ogMap[row]){
        let newMap = copy(map);
        newMap[row][char] = '#';
        if(isLoop(newMap, x, y, row, char, xys2)){
            counter++;
        }
    }
}

let b = [];
xys2.forEach(a => {
    if(!xys.includes(a)) {
        b.push(a);
    }
})

console.log(counter);

function copy(map){
    let newMap = [];
    for(const row in map){
        newMap.push(map[row].slice());
    }
    return newMap;
}

function isLoop(map, x, y, row, char, xys) {
    let turns = 0;
    let inBounds = true;
    while(inBounds) {
        if(Number.isInteger(map[x][y])){
            map[x][y]++;
            if(map[x][y] > 4){
                xys.push(`${row} ${char}`)
                //return true;
            }
        } else{
            map[x][y] = 1;
        }
    
        switch(turns % 4){
            case 0:
                if(x != 0){
                    if(map[x-1][y] == '#') {
                        turns++;
                        y++;
                    } else {
                        x--;
                    }
                } else {
                    inBounds = false;
                }
                break;
            case 1: 
                if(y != map[0].length-1){
                    if(map[x][y+1] == '#') {
                        turns++;
                        x++;
                    } else {
                        y++;
                    }
                } else {
                    inBounds = false;
                }
                break;
            case 2:
                if(x != map.length-1){
                    if(map[x+1][y] == '#') {
                        turns++;
                        y--;
                    } else {
                        x++;
                    }
                } else {
                    inBounds = false;
                }
                break;
            case 3:
                if(y != 0){
                    if(map[x][y-1] == '#') {
                        turns++;
                        x--;
                    } else {
                        y--;
                    }
                } else {
                    inBounds = false;
                }
                break;
        }
    }    
    return false;
}


