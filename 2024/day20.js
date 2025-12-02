import fs from 'fs'
var input = fs.readFileSync('./2024AdventOfCodeDay20Input.txt').toString();
input = fs.readFileSync('./testInput.txt').toString();
const rows = input.split('\n');
let x = -1;
let y = -1;
let counter = 0;

const map = [];
for(const row in rows){
  const arr = [];
  for(const char in rows[row]){
    if(rows[row][char] == 'S'){
      x = parseInt(row);
      y = parseInt(char);
      arr.push(0);
    }else if (rows[row][char] == 'E'){
        arr.push('.');
    } else {
      arr.push(rows[row][char]);
    }
  }
  map.push(arr);
}

let picoSeconds = 1;

while(true){
  if(x > 0 && map[x-1][y] == '.'){
    map[x-1][y] = picoSeconds;
    x--;
  } else if(x < map.length-1 && map[x+1][y] == '.'){
    map[x+1][y] = picoSeconds;
    x++;
  } else if(y > 0 && map[x][y-1] == '.'){
    map[x][y-1] = picoSeconds;
    y--;
  } else if(y < map.length-1 && map[x][y+1] == '.'){
    map[x][y+1] = picoSeconds;
    y++;
  } else {
    console.log("panic")
    break;
  }
  picoSeconds++;
}

for(const row in map){
  for(const col in map[row]){
    if(!isNaN(parseInt(map[row][col]))){
      counter += cheats(row, col);
    }
  }
}
console.log(counter);
//console.log(map);
function cheats(row, col){
  let vals = [];
  for(let x = row - 2; x < row + 3; x++){
    for(let y = col - 2; y < col + 3; y++){
      if(x >= 0 && x < map.length && y >= 0 && y < map[x].length && Math.abs(row - x) + Math.abs(col - y) == 3){
        if(!isNaN(parseInt(map[x][y]))){
          const startNum = parseInt(map[row][col]);
          const endNum = parseInt(map[x][y]);
          if(endNum > startNum + 3){
            if(!vals.includes(endNum-startNum)){
              if(endNum-startNum-3 == 34){
                console.log()
              }
              vals.push(endNum-startNum - 3);
            }
          }
        }
      }
    }
  }
  if(vals.length > 0){
    console.log(vals);
  }
  return vals.length;
}
console.log();