import fs from 'fs';

const input = fs.readFileSync('./day6Input.txt', 'utf8');
const map = input.split('\n');
// const x = 6;
// const y = 4;
const x = 69;
const y = 74;

let counter = 0;
for(let i = 0; i < 130; i++){
    for(let j = 0; j < 130; j++){
        let newMap = map.slice();
        newMap[i] = map[i].slice(0, j) + '#' + map[i].slice(j+1);
        if(isLoop(newMap, x, y, 0)){
            counter++;
        }
    }
}
console.log(counter);


function isLoop(map, x, y, dir){
    while(true){
        if(x < 0 || x >= 130 || y < 0 || y >= map[0].length){
            return false;
        }
        const num = Number(map[x][y])
        if(Number.isInteger(num)){
            if(num > 4){
                return true;
            }
            map[x] = map[x].slice(0, y) + `${parseInt(map[x][y]) + 1}` + map[x].slice(y+1);
        } else {
            map[x] = map[x].slice(0, y) + '1' + map[x].slice(y+1);
        }

        if(dir == 0){
            if(x-1 > -1){
                if(map[x-1][y] == '#'){
                    if(map[x][y+1] != '#'){
                        dir = 1;
                        y++;
                    } else {
                        dir = 2;
                        x++;
                    }
                } else {
                    x--;
                }
            } else {
                x--;
            }
        }
        else if(dir == 1){
            if(y+1 < 130){
                if(map[x][y+1] == '#'){
                    if(map[x+1][y] != '#'){
                        x++;
                        dir = 2;
                    } else {
                        y--;
                        dir = 3;
                    }
                } else {
                    y++;
                }
            } else {
                y++;
            }
        }
        else if(dir == 2){
            if(x + 1 < 130){
                if(map[x+1][y] == '#'){
                    if(map[x][y-1] != '#'){
                        y--;
                        dir = 3
                    } else {
                        x--;
                        dir = 0;
                    }

                } else {
                    x++;
                }
            } else {
                x++
            }
        }
        else if(dir == 3){
            if(y > 0){
                if(map[x][y-1] == '#'){
                    if(map[x-1][y] != '#'){
                        x--;
                        dir = 0;
                    } else {
                        dir = 1;
                        y++;
                    }
                } else {
                    y--;
                }
            } else {
                y--;
            }
        }
    }
}