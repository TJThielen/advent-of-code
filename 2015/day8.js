import fs from 'fs/promises';

const text = await fs.readFile("day8.txt", "utf-8");

function p1(){
    let total = 0;
    let adjusted = 0;
    const lines = text.split('\n');
    lines.forEach(line => {
        total += line.length;
        adjusted += parse(line.substring(1, line.length-1)).length;
    })
    console.log(total);
    console.log(adjusted);
    console.log(total-adjusted);
}

function parse(str){
    const isHex = c => /[0-9a-f]/.test(c);
    let newStr = "";
    for(let i = 0; i < str.length; i++){
        if(str.charAt(i) == '\\' && i < str.length - 1){
            if(str.charAt(i+1) == '\\' || str.charAt(i+1) == '"') {
                newStr += '.';
                i++;
                continue;
            } else if (str.charAt(i+1) == 'x' && i + 3 < str.length){
                if(isHex(str.charAt(i+2)) && isHex(str.charAt(i+3))){
                    newStr += '.';
                    i += 3;
                    continue;
                }
            }
        }
        newStr += str.charAt(i);
    }
    return newStr;
}

function p2(){
    let total = 0;
    let adjusted = 0;
    const lines = text.split('\n');
    lines.forEach(line => {
        total += line.length;
        adjusted += JSON.stringify(line).length;
    })
    console.log(total);
    console.log(adjusted);
    console.log(adjusted-total);
}

p2();