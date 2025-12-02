import fs from 'fs';

const input = fs.readFileSync('./day7Input.txt', 'utf8');
const rows = input.split('\n');
let counter = 0;

for(const row of rows){
    const parts = row.split(':');
    const targetNum = parseInt(parts[0]);
    const numListstr = parts[1].split(' ');
    const numList = numListstr.filter(n => n.length > 0).map(n => parseInt(n));
    if(isValid(0, targetNum, numList)){
        counter += targetNum;
    }

};
console.log(counter);

function isValid(current, target, numList){
    if(current == target && numList.length == 0){
        return true;
    }

    if(current > target || numList.length == 0){
        return false;
    }
    const newList = numList.slice(1);
    return isValid(current * numList[0], target, newList) || isValid(current + numList[0], target, newList) || isValid(parseInt(`${current}${numList[0]}`), target, newList);
}
