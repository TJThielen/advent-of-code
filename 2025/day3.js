import {readFile} from 'fs/promises';

const content = await readFile('./day3.txt', 'utf8');

const lines = content.split('\n');

function p1(){
    let total = 0;
    for(let line of lines){
        let max = '';
        const largest = getLargest(line.substring(0, line.length-1));
        const nextLargest = getLargest(line.substring(largest[1]+1));
        max = largest[0].toString() + nextLargest[0].toString();
        total += Number(max);
    }
    console.log(total);
}

function getLargest(line){
    let largest = 0;
    let largestIndex = 0;
    for(let i = 0; i < line.length; i++){
        largestIndex = Number(largest) < Number(line.charAt(i)) ? i : Number(largestIndex);
        largest = Number(largest) < Number(line.charAt(i)) ? Number(line.charAt(i)) : Number(largest);
    }
    return [largest, largestIndex];
}

function p2(){
    let total = 0;
    for(let line of lines){
        let max = '';
        for(let i = 0; i < 12; i++){
            const largest = getLargest(line.substring(0, line.length-(11-i)));
            max += largest[0];
            line = line.substring(largest[1]+1);
        }
        total += Number(max);
    }
    console.log(total);
}

p2();