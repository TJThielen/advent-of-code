import {readFile} from 'fs/promises';

const content = await readFile('./day3.txt', 'utf8');

const lines = content.split('\n');

function p1(){
    let total = 0;
    for(const line of lines){
        let largest = 0;
        let largestIndex = 0;
        for(let i = 0; i < line.length; i++){
            largestIndex = Number(largest) < Number(line.charAt(i)) ? i : Number(largestIndex);
            largest = Number(largest) < Number(line.charAt(i)) ? Number(line.charAt(i)) : Number(largest);
        }

        let nextLargest = 0;
        if(largestIndex !== line.length - 1){
            for(let i = largestIndex + 1; i < line.length; i++){
                nextLargest = Number(nextLargest) < Number(line.charAt(i)) ? line.charAt(i) : Number(nextLargest);
            }
            total += Number(largest.toString() + nextLargest.toString());
        } else {
            for(let i = 0; i < largestIndex; i++){
                nextLargest = Number(nextLargest) < Number(line.charAt(i)) ? line.charAt(i) : Number(nextLargest);
            }
            total += Number(nextLargest.toString() + largest.toString());
        }
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