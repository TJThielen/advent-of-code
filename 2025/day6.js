import {readFile} from 'fs/promises';

// const file = await readFile('./day6.txt', 'utf8')
const file = await readFile('./day6.txt', 'utf8')
const content = file.split('\n');


console.log();

function p1(){
    const nums = [];
    for(let i = 0; i < content.length; i++){
        const line = content[i].split(/\s+/);
        for(let j = 0; j < line.length; j++){
            if(!nums[j]){
                nums[j] = [];
            }
            nums[j].push(line[j])
        }
    }

    let total = 0;
    for(const equations of nums){
        let temp = Number(equations[0]);
        if(equations[equations.length-1] == '*'){
            for(let i = 1; i < equations.length-1; i++){
                temp *= Number(equations[i]);
            }
        } else {
            for(let i = 1; i < equations.length-1; i++){
                temp += Number(equations[i]);
            }
        }
        total += temp;
    }
    console.log(total);
}

function p2(){
    let numIndicator = 0;
    const nums = [];
    let arr = [];
    for(let i = 0; i < content[0].length; i++){
        let num = false;
        for(let j = 0; j < content.length-1; j++){
            if(/\d/.test(content[j].charAt(i))){
                num = true;
            }
        }
        if(num){
            for(let j = 0; j < content.length-1; j++){
                if(!arr[numIndicator]){
                    arr[numIndicator] = "";
                }
                arr[numIndicator] += content[j].charAt(i);
            }
            numIndicator++;
        } else {
            nums.push(arr);
            arr = [];
            numIndicator = 0;
        }
    }
    nums.push(arr);

    const operators = content[content.length-1].split(/\s+/);

    let total = 0;
    for(const n in nums){
        let temp = Number(nums[n][0]);
        if(operators[n] == '*'){
            for(let i = 1; i < nums[n].length; i++){
                temp *= Number(nums[n][i]);
            }
        } else {
            for(let i = 1; i < nums[n].length; i++){
                temp += Number(nums[n][i]);
            }
        }
        total += temp;
    
    }
    console.log(total);
}
