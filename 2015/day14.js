import fs from 'fs/promises';

const text = await fs.readFile("day14.txt", "utf-8");
const lines = text.split('\n').map(line => {
    const parts = line.split(' ');
    return [parts[0], parts[3], parts[6], parts[13]]
});

function computeDistance(arr, sec){
    let distance = 0;
    const speed = Number(arr[1]);
    const runTime = Number(arr[2]);
    const restTime = Number(arr[3]);
    let fullCycles = Math.floor(sec / (runTime + restTime));
    let remainingSecs = sec % (runTime + restTime);
    distance = speed * runTime * fullCycles;
    if(remainingSecs >= runTime){
        distance += speed * runTime;
    } else {
        distance += speed * remainingSecs;
    }
    return distance;
}

function p1(){
    let max = 0;
    lines.forEach(line => {
        const dist = computeDistance(line, 2503);
        max = max > dist ? max : dist;
    })
    console.log(max);
}

function p2(){
    const scores = [];
    for(let i = 1; i < 2503; i++){
        let max = 0;
        let maxIndex = [];
        for(const index in lines){
            const dist = computeDistance(lines[index], i);
            if(dist > max){
                max = dist;
                maxIndex = [index];
            } else if(dist == max){
                maxIndex.push(index);
            }
        }
        maxIndex.forEach(deer => {
            scores[deer] = scores[deer] == undefined ? 1 : scores[deer]+1;
        })
    }

    let max = 0;
    scores.forEach(score => {
        max = score > max ? score : max;
    })
    console.log(max);
}

p2();