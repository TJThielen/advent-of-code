import fs from 'fs/promises';

const text = await fs.readFile("day3.txt", "utf-8");
const map = new Map();

let total = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

for(let i = 0; i < text.length; i++){
    if(i % 2 == 0) {
        switch(text.charAt(i)){
            case '^':
                y1 += 1;
                break;
            case '>':
                x1 += 1;
                break;
            case '<':
                x1 -= 1;
                break;
            case 'v':
                y1 -= 1;
                break;
            default: 
                console.log('aahhh');
        }
        map.set(`${x1},${y1}`, (map.get(`${x1},${y1}`) ?? 0) + 1);
    } else {
        switch(text.charAt(i)){
            case '^':
                y2 += 1;
                break;
            case '>':
                x2 += 1;
                break;
            case '<':
                x2 -= 1;
                break;
            case 'v':
                y2 -= 1;
                break;
            default: 
                console.log('aahhh');
        }
        map.set(`${x2},${y2}`, (map.get(`${x2},${y2}`) ?? 0) + 1);
    }
}


console.log(map.size);