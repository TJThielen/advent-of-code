import fs from 'fs';

const input = fs.readFileSync('./day8Input.txt', 'utf8');

const result = [];
let val = 0; 
let i = 0;

while(i < input.length){
    for(let j = 0; j < input[i]; j++){
        i % 2 == 0 ? result.push(i/2) : result.push('.');
    }
    i++;
}

i = 0;
let j = result.length-1;
while(i < j){
    while(result[j] == '.'){
        j--;
    }

    while(result[i] != '.'){
        i++;
    }

    if(i < j){
        result[i] = result[j];
        result[j] = '.';
        i++;
        j--;
    }
}

for(let i = 0; i < result.length; i++){
    if(result[i] != '.'){
        val += i * result[i];
    } else {
        break;
    }
}


console.log(val);



