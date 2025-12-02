import fs from 'fs';
import { debugPort } from 'process';

var input = fs.readFileSync('./day5Input.txt', 'utf8');
//input = fs.readFileSync('./testinput.txt', 'utf8');
const sections = input.split('\n\n');
const rules = sections[0];
const pages = sections[1];

const ruleArr = rules.split('\n');
const pageArr = pages.split('\n');

const rulePairs = ruleArr.map(p => p.split("|"));
const orders = pageArr.map(p => p.split(",").map(o => parseInt(o)));
let counter = 0;
for (const order of orders){
    if(!isValid(order, rulePairs)){
        const newOrder = reorder(order, rulePairs);
        counter += newOrder[(newOrder.length-1)/2];
    }
}
console.log(counter);


function isValid(numArr, rulesArr){
    const badNums = [];
    for(const num of numArr){
        if(badNums.includes(num)){
            return false;
        }
        rulesArr.forEach(rule => {
            if(rule[1] == num){
                badNums.push(parseInt(rule[0]));
            }
        })
    }
    return true;
}

function reorder(numArr, rulesArr){
    const orderedArr = [];
    const numsToPlace = [...numArr];
    const dependencies = {};
    for(const num of numArr){
        rulesArr.forEach(rule => {
            if(rule[1] == num && numArr.includes(parseInt(rule[0]))){
                if(dependencies[num] != null){
                    dependencies[num].push(parseInt(rule[0]))
                } else {
                    dependencies[num] = [parseInt(rule[0])];
                }
            }
        })
    }

    let i = 0;
    while(numsToPlace.length > 0){
        if(dependencies[numsToPlace[i]]) {
            if(dependencies[numsToPlace[i]].filter(n => numsToPlace.includes(n)).length == 0) {
                orderedArr.push(numsToPlace[i]);
                numsToPlace.splice(i, 1);
                i = 0;
            } else {
                if(i == numsToPlace.length-1) {
                    i = 0;
                } else {
                    i++;
                }
            }
        } else {
            orderedArr.push(numsToPlace[i]);
            numsToPlace.splice(i, 1);
            i = 0;
        }
    }
    if(!isValid(orderedArr, rulesArr) ){
        console.log("panic");
    }
    return orderedArr;
}
