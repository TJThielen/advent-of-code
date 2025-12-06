import {readFile} from 'fs/promises';

const file = await readFile('./day5.txt', 'utf8')
const content = file.split('\n\n');

const ranges = content[0].split('\n');
const ingredients = content[1].split('\n');
const rangeStarts = [];
const rangeEnds = [];
ranges.forEach(range => {
    const a = range.split('-');
    rangeStarts.push(Number(a[0]));
    rangeEnds.push(Number(a[1]));
})

function p1(){
    let total = 0;
    for(const ingredient of ingredients) {
        for(const i in rangeStarts) {
            if(Number(ingredient) > rangeStarts[i] && Number(ingredient < rangeEnds[i])) {
                total++;
                break;
            }
        }
    }
    console.log(total);
}

function p2(){

    for(let i = 1; i < rangeStarts.length; i++){
        if(rangeStarts[i]< rangeStarts[i-1]){
            let t1 = rangeStarts[i];
            let t2 = rangeEnds[i];
            rangeStarts[i] = rangeStarts[i-1];
            rangeEnds[i] = rangeEnds[i-1]
            rangeStarts[i-1] = t1;
            rangeEnds[i-1] = t2;
            i=0
        }
    }

    for(let i = 1; i < rangeStarts.length; i++){
        if(rangeEnds[i] < rangeEnds[i-1]) {
            rangeStarts.splice(i, 1);
            rangeEnds.splice(i, 1);
            i=0
        } else if(rangeStarts[i] <= rangeEnds[i-1]){
            rangeStarts[i] = rangeEnds[i-1] + 1;
            i=0;
        }
    }
    
    let total = 0;
    for(const i in rangeStarts) {
        total += (rangeEnds[i] - rangeStarts[i] + 1);
    }
    console.log(total)
}

p2();