import fs from 'fs/promises';

const text = await fs.readFile("day1.txt", "utf-8");
let floor = 0;
let position = 0;
let first = 1;
for(let i = 0; i < text.length; i++){
    position++;
    if(text.charAt(i) == '('){
        floor++;
    } else {
        floor--;
    }
    if(floor == -1 && first){
        console.log(position);
        first = 0;
    }
}

console.log(floor);