import fs from 'fs'

const input = fs.readFileSync('./2024AdventOfCodeDay3Input.txt').toString();

const donts = input.split("don't()");
const dos = [...donts.splice(0,1)];
donts.forEach(d => {
    const arr = d.split("do()");
    arr.splice(0,1);
    dos.push(...arr);
});
var total = 0;
dos.forEach(d => {
    total += findMults(d);
})
console.log(total);

function findMults(input){
    const matches = [...input.match(/mul\(([0-9]+),([0-9]+)\)/g)];
    var total = 0;
    for(let i = 0; i < matches.length; i++){
        const str = matches[i];
        const substr = str.slice(4,str.length-1);
        const parts = substr.split(',');
        if(parts[0].length > 0 && parts[0].length < 4 && parts[1].length > 0 && parts[1].length < 4){
            const sum = (parseInt(parts[0]) * parseInt(parts[1]));
            total += sum;
        }
    }
    return total;
}

