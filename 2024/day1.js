import fs from 'fs'

var counter = 0;
const test1 = [1, 2, 3, 4, 5];
const test2 = [3, 3, 5, 5];
const input = fs.readFileSync('./2024AdventOfCodeDay1Input.txt').toString();
const pairs = input.split("\n")
const list1 = [];
const list2 = [];
pairs.forEach(pair => {
    const p = pair.split("   ");
    if(p.length > 1){
        list1.push(p[0]);
        list2.push(p[1]);
    }
})

for(const a in test1){
    var rightCounter = 0;
    const left = test1[a];
    for (const b in test2){
        if(test2[b] == left){
            rightCounter++;
        }
    }
    counter += (left * rightCounter);
}

console.log(counter);