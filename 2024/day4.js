import fs from 'fs';

const input = fs.readFileSync('./day4Input.txt', 'utf8');
const rows = input.split('\n');
const diagonal1 = {};
const diagonal2 = {};
const diagonal1i = {};
const diagonal2i = {};
rows.forEach((row, index) => {
    for(let i = 0; i < row.length; i++){

        if(diagonal1[i+index]){
            diagonal1[i+index] += row[i];
            diagonal1i[i+index].push(`${index} ${i}`);
        } else {
            diagonal1[i+index] = row[i];
            diagonal1i[i+index] = [`${index} ${i}`];
        }

        if(diagonal2[i+rows.length-index-1]){
            diagonal2[i+rows.length-index-1] += row[i];
            diagonal2i[i+rows.length-index-1].push(`${index} ${i}`);
        } else {
            diagonal2[i+rows.length-index-1] = row[i];
            diagonal2i[i+rows.length-index-1] = [`${index} ${i}`];
        }
    }
})

var d1Sams = [];
var d2Sams = [];

for(const index in diagonal1){
    d1Sams.push(...getIndicies(diagonal1[index], diagonal1i[index]));
}

for(const index in diagonal2){
    d2Sams.push(...getIndicies(diagonal2[index], diagonal2i[index]));
}

d1Sams = d1Sams.filter(a => d2Sams.includes(a));
console.log(d1Sams.length)
function getIndicies(values, indicies){
    const arr = [];
    for(let i = 1; i < values.length-1; i++){
        if(values[i] == 'A'){
            if((values[i-1] == 'S' && values[i+1] == 'M') || (values[i-1] == 'M' && values[i+1] == 'S')) {
                arr.push(indicies[i]);
            }
        }
    }
    return arr;
}
console.log('here');