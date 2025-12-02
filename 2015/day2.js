import fs from 'fs/promises';

let total = 0;
const text = await fs.readFile("day2.txt", "utf-8");
const arr = text.split('\n');

arr.forEach(box => {
    const sides = box.split('x').sort((a, b) => a - b);
    total += (sides[0] * 2) + (sides[1] * 2) + (sides[0] * sides[1] * sides[2]);
    // total += 2*(sides[0]*sides[1] + sides[0]*sides[2] + sides[1]*sides[2]) + (sides[0]*sides[1]);
})
console.log(total);